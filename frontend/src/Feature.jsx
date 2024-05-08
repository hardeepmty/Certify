import React from 'react';
import './Feature.css'; // Import the CSS file

const Feature = () => {
  return (
    <div className="feature-container">
      <div className="feature-content">
        <h1 className="feature-title">Streamline Certificate Creation with CSV Upload</h1>
        <p className="feature-description">
          Effortlessly manage your certificate creation with our CSV file upload feature. Upload a CSV file containing your students' or colleagues' names, courses, and completion dates.
          <br></br><br></br>Our app will automatically read and process the data, generating beautiful, personalized certificates in PDF format for each individual.
          <br></br><br></br>Once processed, download the certificates either as individual PDFs or as a bundled ZIP file, streamlining your workflow and saving you valuable time.
          Simplify your certificate generation process and provide a seamless experience for your users with this powerful tool.
        </p>
      </div>

      <div className="feature-image-container">
        {/* <img src="/images/certifcate.jpg" alt="Certificate" className="feature-image" /> */}
      </div>
    </div>
  );
};

export default Feature;
