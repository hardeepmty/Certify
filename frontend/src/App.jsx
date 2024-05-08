import React from 'react';
import CertificateForm from './CertificateForm';
import CsvUploadForm from './CsvUploadForm';
import './App.css'; 
import Navbar from './Navbar';
import Feature from './Feature';

function App() {
    return (
        <div>
            <Navbar/>
            <h1 style={{fontFamily:"Montserrat", textAlign:"center", fontWeight:"800", fontSize:"60px"}}>Your Certificate Generator</h1>
            <h2 style={{fontFamily:"Montserrat", textAlign:"center", fontWeight:"500", marginLeft:"10px", marginRight:"15px"}}>Create stunning certificates for students and colleagues, ready for instant PDF download.</h2>
            
            <div style={{textAlign:"center"}}>
            <button style={{fontFamily:"Montserrat", padding:"20px", fontSize:"20px", fontWeight:"500", borderRadius:"5px", backgroundColor:"#17252a", color:"#def2f1", border:"2px solid black", marginTop:"20px"}}>Let's Get Started !</button>
            </div>

            <div style={{ textAlign: 'center', marginTop:"20px" }}>
            <p style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily:"Montserrat" }}>
            <img src="/images/tick.png" alt="tick" style={{ marginRight: '10px', width:"30px" }} />
            100% Free Download PDF
            </p>
        </div>


            <Feature/>
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
