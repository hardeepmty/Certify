import React, { useRef } from 'react';
import Navbar from './Navbar';
import Feature from './Feature';
import Footer from './Footer';
import CsvUploadForm from './CsvUploadForm';
import CertificateForm from './CertificateForm';
import './App.css';

function App() {
    const csvUploadRef = useRef(null);
    const certificateFormRef = useRef(null);

    const handleCsvUploadClick = () => {
        csvUploadRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCertificateFormClick = () => {
        certificateFormRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar />
            <h1 style={{
                fontFamily: 'Montserrat',
                textAlign: 'center',
                fontWeight: '800',
                fontSize: '60px'
            }}>
                Your Certificate Generator
            </h1>
            <h2 style={{
                fontFamily: 'Montserrat',
                textAlign: 'center',
                fontWeight: '500',
                marginLeft: '10px',
                marginRight: '15px'
            }}>
                Create stunning certificates for students and colleagues, ready for instant PDF download.
            </h2>

            <div style={{
                textAlign: 'center',
                display: 'flex',
                gap: '20px',
                justifyContent: 'center'
            }}>
                <button
                    style={{
                        fontFamily: 'Montserrat',
                        padding: '20px',
                        fontSize: '20px',
                        fontWeight: '500',
                        borderRadius: '5px',
                        backgroundColor: '#17252a',
                        color: '#def2f1',
                        border: '2px solid black',
                        marginTop: '20px',
                        cursor: 'pointer'
                    }}
                    onClick={handleCsvUploadClick}
                >
                    CSV Upload
                </button>
                <button
                    style={{
                        fontFamily: 'Montserrat',
                        padding: '20px',
                        fontSize: '20px',
                        fontWeight: '500',
                        borderRadius: '5px',
                        backgroundColor: '#17252a',
                        color: '#def2f1',
                        border: '2px solid black',
                        marginTop: '20px',
                        cursor: 'pointer'
                    }}
                    onClick={handleCertificateFormClick}
                >
                    Individual
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Montserrat',
                    fontWeight: '500'
                }}>
                    <img src="/images/tick.png" alt="tick" style={{ marginRight: '10px', width: '30px' }} />
                    100% Free Download PDF
                </p>
            </div>

            <Feature />

            <div ref={csvUploadRef}>
                <CsvUploadForm />
            </div>

            <div ref={certificateFormRef}>
                <CertificateForm />
            </div>

            <Footer />
        </div>
    );
}

export default App;
