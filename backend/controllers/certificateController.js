const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const Certificate = require('../models/certificateModel');

async function generateCertificate(name, course, date) {

  const pdfDirectory = path.join(__dirname, '..', 'pdfs');

   if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory);
   }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    page.drawText('Certificate of Completion', {
      x: width / 2 - 120, 
      y: height - 100, 
      size: 24,
  });
  
  page.drawText('This certifies that', {
      x: 50, 
      y: height - 150, 
      size: 16,
  });
  

  page.drawText(name, {
      x: 50, 
      y: height - 190, 
      size: 20,
  });
  
  page.drawText('has completed the course', {
      x: 50, 
      y: height - 230, 
      size: 16,
  });
  

  page.drawText(course, {
      x: 50, 
      y: height - 270, 
      size: 20,
  });
  

  page.drawText(`on ${date.toLocaleDateString()}`, {
      x: 50, 
      y: height - 310, 
      size: 16,
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
