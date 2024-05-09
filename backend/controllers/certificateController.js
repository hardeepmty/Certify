const path = require('path');
const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
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

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const blueColor = rgb(0, 0, 1);

    const borderWidth = 4; 
    const x = borderWidth / 2;
    const y = borderWidth / 2;
    const rectWidth = width - borderWidth;
    const rectHeight = height - borderWidth;

    page.drawRectangle({
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        borderColor: blueColor,
        borderWidth: borderWidth,
    });

    const imagePath = './design.png';
    const imageData = fs.readFileSync(imagePath);
    const image = await pdfDoc.embedPng(imageData);

    page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
    });

  
    function drawCenteredText(text, font, size, y) {
        const textWidth = font.widthOfTextAtSize(text, size);
        const x = (width - textWidth) / 2;
        page.drawText(text, {
            x,
            y,
            size,
            font,
        });
    }

    // Define text style and positions
    const lineHeight = 40; // Vertical spacing between lines
    let currentY = height - 100;

    // Draw text on the certificate
    drawCenteredText('Certificate of Completion', fontBold, 24, currentY);
    currentY -= lineHeight;

    drawCenteredText('This certifies that', fontRegular, 16, currentY);
    currentY -= lineHeight;

    drawCenteredText(name, fontBold, 20, currentY);
    currentY -= lineHeight;

    drawCenteredText('has completed the course', fontRegular, 16, currentY);
    currentY -= lineHeight;

    drawCenteredText(course, fontBold, 20, currentY);
    currentY -= lineHeight;

    drawCenteredText(`on ${date.toLocaleDateString()}`, fontRegular, 16, currentY);

    // Save the PDF and return the bytes
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
