const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const certificateRoutes = require('./routes/certificateRoutes'); 

const app = express();

app.use(cors()); 


app.use(express.json());

mongoose.connect('mongodb+srv://mohanty4raj:lpuZjUPEGmGlBPFy@cluster0.fiaafld.mongodb.net/Certify?retryWrites=true&w=majority&appName=Cluster0');


app.use('/', certificateRoutes);


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
