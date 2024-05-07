const express = require('express');
const { generateCertificateController, uploadCsvAndGenerateCertificates } = require('../controllers/certificateController');
const multer = require('multer');

const router = express.Router();

// Set up Multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/api/certificate', generateCertificateController);

router.post('/api/upload-csv', upload.single('csvFile'), uploadCsvAndGenerateCertificates);


module.exports = router;
