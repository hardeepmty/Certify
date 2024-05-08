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
            const response = await axios.post('https://certify-ibwg.onrender.com/api/certificate', formData, {
                responseType: 'arraybuffer' 
            });

            // creating a blob so that it can handle the binary data that can be used to generate a link 
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // this creates a download link of the format <a href=....
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${formData.name}_certificate.pdf`;
            downloadLink.click(); // something like onClick Function...

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
