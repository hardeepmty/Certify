import React, { useState } from 'react';
import axios from 'axios';
import './CertificateForm.css'; // Importing the CSS file for styling

function CertificateForm() {
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        date: '',
        email: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('https://certify-ibwg.onrender.com/api/certificate', formData, {
                responseType: 'arraybuffer'
            });

            // Creating a blob to handle binary data for generating the download link
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a download link for the certificate
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${formData.name}_certificate.pdf`;
            downloadLink.click();

            console.log('Certificate downloaded successfully');
        } catch (error) {
            console.error('Error generating certificate:', error);
        }
    }

    return (
        <div className="certificate-form-container">
            <h2 className="certificate-form-title">Generate Certificate</h2>
            <form className="certificate-form" onSubmit={handleSubmit}>
                <div>
                    <label className="certificate-form-label">Name:</label>
                    <input
                        className="certificate-form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="certificate-form-label">Course:</label>
                    <input
                        className="certificate-form-input"
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="certificate-form-label">Date:</label>
                    <input
                        className="certificate-form-input"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="certificate-form-label">Email:</label>
                    <input
                        className="certificate-form-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="certificate-form-button">Generate Certificate</button>
            </form>
        </div>
    );
}

export default CertificateForm;
