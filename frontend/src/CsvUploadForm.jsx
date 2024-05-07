import React, { useState } from 'react';
import axios from 'axios';

function CsvUploadForm() {
    const [csvFile, setCsvFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!csvFile) {
            setUploadStatus('Please select a CSV file.');
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', csvFile);

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post('https://certify-ibwg.onrender.com/api/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'certificates.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();

            setUploadStatus('Upload successful! Certificates downloaded.');
        } catch (error) {
            setUploadStatus('Upload failed. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginLeft:"30px" }}>
            <h2>Bulk Certificate Generation</h2>
            <p>Add a CSV file having name,course,email and date to generate certificates in bulk</p>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload CSV and Generate Certificates</button>
            <p>{uploadStatus}</p>
        </div>
    );
}

export default CsvUploadForm;
