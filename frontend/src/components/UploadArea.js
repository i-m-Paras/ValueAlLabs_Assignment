import React, { useState } from "react";
import "./../styles/UploadArea.css";

const UploadArea = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    validateAndUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateAndUpload(file);
  };

  const validateAndUpload = (file) => {
    setError(null);

    if (file && file.type === "application/pdf") {
      onFileUpload(file); // Pass the file to parent component
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="upload-page">
      <h1 className="page-title">Document Analyzer</h1>
      <div className="upload-container">
        <div
          className={`upload-dropzone ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag and drop a PDF file here, or</p>
          <label htmlFor="fileInput" className="upload-label">
            <span>Browse</span>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default UploadArea;
