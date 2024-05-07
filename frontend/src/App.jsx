import React from 'react';
import CertificateForm from './CertificateForm';
import CsvUploadForm from './CsvUploadForm';

function App() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Certificate Generator</h1>
            <div style={{ marginBottom: '30px' }}>
                <CertificateForm />
            </div>
            <div>
                <CsvUploadForm />
            </div>
        </div>
    );
}

export default App;
