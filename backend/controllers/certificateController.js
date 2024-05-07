const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const Certificate = require('../models/certificateModel');

async function generateCertificate(name, course, date) {

  const pdfDirectory = path.join(__dirname, '..', 'pdfs');

   if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory);
   }

    // Create a PDF document and add a page
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    // Add text to the page
    page.drawText('Certificate of Completion', { x: 200, y: height - 100, size: 24 });
    page.drawText('This certifies that', { x: 220, y: height - 150, size: 16 });
    page.drawText(name, { x: 250, y: height - 200, size: 20 });
    page.drawText('has completed the course', { x: 220, y: height - 250, size: 16 });
    page.drawText(course, { x: 250, y: height - 300, size: 20 });
    page.drawText(`on ${date.toLocaleDateString()}`, { x: 220, y: height - 350, size: 16 });

    // Save the PDF document and return its bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

async function generateCertificateController(req, res) {
    const { name, course, date, email } = req.body;

    try {
        
        const pdfBytes = await generateCertificate(name, course, new Date(date));

        
        const pdfFilename = `${name}_certificate.pdf`;
        const pdfPath = path.join(__dirname, '..', 'pdfs', pdfFilename);

        
        fs.writeFileSync(pdfPath, pdfBytes);  //saves the pdf  file on the server

        
        const pdfLink = `${req.protocol}://${req.get('host')}/pdfs/${pdfFilename}`;

        const certificate = new Certificate({
            name,
            course,
            date,
            email,
            pdfLink,
        });

         //this will save the pdf link on mongodb
        await certificate.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdfFilename}`);

        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ message: 'Error generating certificate' });
    }
}

module.exports = generateCertificateController;