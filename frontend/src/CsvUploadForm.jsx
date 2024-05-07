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
            const response = await axios.post('http://localhost:3001/api/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            // Handle the response (zip file) as a Blob
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
        <div style={{ textAlign: 'center' }}>
            <h2>Bulk Certificate Generation</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload CSV and Generate Certificates</button>
            <p>{uploadStatus}</p>
        </div>
    );
}

export default CsvUploadForm;
