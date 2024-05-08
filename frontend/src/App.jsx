import React from 'react';
import CertificateForm from './CertificateForm';
import CsvUploadForm from './CsvUploadForm';
import './App.css'; 
import Navbar from './Navbar';

function App() {
    return (
        <div>
            <Navbar/>
            <h1 style={{fontFamily:"Montserrat", textAlign:"center", fontWeight:"800"}}>Your Certificate Generator</h1>
            <h2 style={{fontFamily:"Montserrat", textAlign:"center", fontWeight:"500", marginLeft:"15px", marginRight:"15px"}}>Create stunning certificates for students and colleagues, ready for instant PDF download.</h2>
        <div className="app-container" >
            <div className="form-container">
                <CertificateForm />
            </div>
            <div className="form-container">
                <CsvUploadForm />
            </div>
        </div>
        </div>
    );
}

export default App;
