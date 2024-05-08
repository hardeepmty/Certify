import React from 'react';
import CertificateForm from './CertificateForm';
import CsvUploadForm from './CsvUploadForm';
import './App.css'; 
import Navbar from './Navbar';

function App() {
    return (
        <div>
            <Navbar/>
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
