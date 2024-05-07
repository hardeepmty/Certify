const express = require('express');
const mongoose = require('mongoose');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

// Create an Express app
const app = express();

// Enable CORS
app.use(cors()); // Use cors middleware with default settings

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mohanty4raj:lpuZjUPEGmGlBPFy@cluster0.fiaafld.mongodb.net/Certify?retryWrites=true&w=majority&appName=Cluster0');

// Define a certificate schema and model
const certificateSchema = new mongoose.Schema({
    name: String,
    course: String,
    date: Date,
    email: String,
    pdfLink: String
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// Function to generate PDF certificates
async function generateCertificate(name, course, date) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    // Add text to the page
    page.drawText(`Certificate of Completion`, { x: 200, y: height - 100, size: 24 });
    page.drawText(`This certifies that`, { x: 220, y: height - 150, size: 16 });
    page.drawText(name, { x: 250, y: height - 200, size: 20 });
    page.drawText(`has completed the course`, { x: 220, y: height - 250, size: 16 });
    page.drawText(course, { x: 250, y: height - 300, size: 20 });
    page.drawText(`on ${date.toLocaleDateString()}`, { x: 220, y: height - 350, size: 16 });

    // Save PDF document and return its bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

// Route to handle certificate generation
app.post('/api/certificate', async (req, res) => {
  const { name, course, date, email } = req.body;

  try {

      const pdfBytes = await generateCertificate(name, course, new Date(date));


      const pdfFilename = `${name}_certificate.pdf`;
      const pdfPath = path.join(__dirname, pdfFilename);
      fs.writeFileSync(pdfPath, pdfBytes);

      const pdfLink = `${req.protocol}://${req.get('host')}/${pdfFilename}`;


      const certificate = new Certificate({
          name,
          course,
          date,
          email,
          pdfLink,
      });

      // Save the certificate document to MongoDB
      await certificate.save();

      // Send the PDF link back in the response
      res.json({
          message: 'Certificate generated and saved successfully.',
          pdfLink,
      });

      // Optionally: You can remove the locally saved PDF file if you do not need it anymore
      // fs.unlinkSync(pdfPath);
  } catch (error) {
      // Handle any errors
      console.error('Error generating certificate:', error);
      res.status(500).json({ message: 'Error generating certificate' });
  }
});


// Start the server
const PORT = 3001; // Customize the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
