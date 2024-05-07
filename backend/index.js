const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const certificateRoutes = require('./routes/certificateRoutes'); // Import routes

// Create an Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://mohanty4raj:lpuZjUPEGmGlBPFy@cluster0.fiaafld.mongodb.net/Certify?retryWrites=true&w=majority&appName=Cluster0'
);

// Use certificate routes
app.use('/', certificateRoutes);

// Define the port and start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
