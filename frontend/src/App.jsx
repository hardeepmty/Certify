import React from 'react';
import CertificateForm from './CertificateForm';
import CsvUploadForm from './CsvUploadForm';
import './App.css'; // Importing the CSS file for styling

function App() {
    return (
        <div>
            <h1 style={{marginTop:"-100px"}}>Certificate Generator</h1>
        <div className="app-container" style={{display:"flex"}}>
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
