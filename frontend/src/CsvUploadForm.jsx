import React, { useState } from 'react';
import axios from 'axios';
import './CsvUploadForm.css'; 

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
        <div className="csv-upload-form">
            <h2 className="csv-upload-title">Bulk Certificate Generation</h2>
            <p className="csv-upload-description">Add a CSV file containing names, courses, emails, and dates to generate certificates in bulk.</p>
            <input type="file" accept=".csv" onChange={handleFileChange} className="csv-upload-input" />
            <button onClick={handleUpload} className="csv-upload-button">Upload CSV and Generate Certificates</button>
            <p className="csv-upload-status">{uploadStatus}</p>
        </div>
    );
}

export default CsvUploadForm;
