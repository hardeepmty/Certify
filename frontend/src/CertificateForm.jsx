import React, { useState } from 'react';
import axios from 'axios';

function CertificateForm() {
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        date: '',
        email: ''
    });

    // Handle input changes
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Make a POST request to the backend server
            const response = await axios.post('http://localhost:3001/api/certificate', formData, {
                responseType: 'arraybuffer' // Set the response type to arraybuffer to handle the PDF file
            });

            // Create a blob from the PDF bytes
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a download link for the blob
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${formData.name}_certificate.pdf`;
            downloadLink.click(); // Trigger the download

            // Log success message (optional)
            console.log('Certificate downloaded successfully');
        } catch (error) {
            console.error('Error generating certificate:', error);
        }
    }

    return (
        <div>
            <h2>Generate Certificate</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Course:</label>
                    <input
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Generate Certificate</button>
            </form>
        </div>
    );
}

export default CertificateForm;
