const express = require('express');
const generateCertificateController = require('../controllers/certificateController');

const router = express.Router();


router.post('/api/certificate', generateCertificateController);

module.exports = router;
