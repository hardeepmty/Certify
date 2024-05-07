import React from 'react';
import CertificateForm from './CertificateForm';
import CsvUploadForm from './CsvUploadForm';

function App() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Certificate Generator</h1>
            <div style={{ marginBottom: '30px' }}>
                {/* Certificate form for generating individual certificates */}
                <CertificateForm />
            </div>
            <div>
                {/* CSV Upload form for bulk certificate generation */}
                <CsvUploadForm />
            </div>
        </div>
    );
}

export default App;
