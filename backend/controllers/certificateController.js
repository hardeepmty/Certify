const path = require('path');
const fs = require('fs');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const multer = require('multer');
const csvParser = require('csv-parser');
const AdmZip = require('adm-zip');
const Certificate = require('../models/certificateModel');

const upload = multer({
    storage: multer.memoryStorage(),
});

async function generateCertificate(name, course, date) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('Certificate of Completion', {
        x: width / 2 - 120,
        y: height - 100,
        size: 24,
        font,
    });
    
    page.drawText('This certifies that', {
        x: 50,
        y: height - 150,
        size: 16,
        font,
    });

    page.drawText(name, {
        x: 50,
        y: height - 190,
        size: 20,
        font,
    });

    page.drawText('has completed the course', {
        x: 50,
        y: height - 230,
        size: 16,
        font,
    });

    page.drawText(course, {
        x: 50,
        y: height - 270,
        size: 20,
        font,
    });

    page.drawText(`on ${date.toLocaleDateString()}`, {
        x: 50,
        y: height - 310,
        size: 16,
        font,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

async function generateCertificateController(req, res) {
    const { name, course, date, email } = req.body;

    try {
        const pdfBytes = await generateCertificate(name, course, new Date(date));

        const pdfFilename = `${name}_certificate.pdf`;
        const pdfPath = path.join(__dirname, '..', 'pdfs', pdfFilename);

        fs.writeFileSync(pdfPath, pdfBytes);

        const pdfLink = `${req.protocol}://${req.get('host')}/pdfs/${pdfFilename}`;

        const certificate = new Certificate({
            name,
            course,
            date,
            email,
            pdfLink,
        });
        await certificate.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdfFilename}`);
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ message: 'Error generating certificate' });
    }
}

async function uploadCsvAndGenerateCertificates(req, res) {
    try {
        const csvData = [];
        const fileBuffer = req.file.buffer;

        const readableStream = require('stream').Readable.from(fileBuffer);
        readableStream
            .pipe(csvParser())
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', async () => {
                // Create a ZIP archive
                const zip = new AdmZip();

                //it willl  process each row in the CSV data
                for (const row of csvData) {
                    const { name, course, date } = row;

                    const parsedDate = new Date(date);

                    //it will see each line and Generate a certificate for each row
                    const pdfBytes = await generateCertificate(name, course, parsedDate);

                    // Save the PDF in the ZIP archive
                    const pdfFilename = `${name}_certificate.pdf`;
                    zip.addFile(pdfFilename, pdfBytes);
                }

                // Create the ZIP file as a buffer
                const zipBuffer = zip.toBuffer();

                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', 'attachment; filename=certificates.zip');

                res.send(zipBuffer);
            });
    } catch (error) {
        console.error('Error processing CSV file:', error);
        res.status(500).json({ message: 'Error processing CSV file' });
    }
}

// Export the controller functions
module.exports = {
    generateCertificateController,
    uploadCsvAndGenerateCertificates,
};
