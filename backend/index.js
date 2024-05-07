const express = require('express');
const mongoose = require('mongoose');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors package

// Create an Express app
const app = express();

// Enable CORS
app.use(cors()); // Use cors middleware with default settings

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mernCertificateGenerator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

    // Generate the PDF certificate
    const pdfBytes = await generateCertificate(name, course, new Date(date));

    // Save the PDF file on the server
    const pdfPath = path.join(__dirname, `${name}_certificate.pdf`);
    fs.writeFileSync(pdfPath, pdfBytes);

    // Send the certificate to the user for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${name}_certificate.pdf`);
    
    // Send the PDF bytes
    res.send(Buffer.from(pdfBytes));
    
    // Remove the locally saved PDF file after sending the response
    fs.unlinkSync(pdfPath);
});

// Start the server
const PORT = 3001; // Customize the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
