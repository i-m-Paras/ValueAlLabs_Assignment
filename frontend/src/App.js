import React, { useState } from "react";
import axios from "axios";
import UploadArea from "./components/UploadArea";
import LoadingAnimation from "./components/LoadingAnimation";
import WordAnalysis from "./components/WordAnalysis";
import FrequencyAnalysis from "./components/FrequencyAnalysis";
import logo from "./assets/logo.png"; // Ensure you have a logo in the assets folder

const App = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [showAnalysisOptions, setShowAnalysisOptions] = useState(false);
  const [wordFrequency, setWordFrequency] = useState([]);

  const handleFileUpload = async (file) => {
    setIsAnalyzing(true);
    setAnalysisData(null);
    setError(null);
    setShowAnalysisOptions(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAnalysisData(response.data);
      setWordFrequency(response.data.wordFrequency);
      setShowAnalysisOptions(true);
    } catch (err) {
      setError("An error occurred while analyzing the document.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteWords = (wordsToDelete) => {
    setWordFrequency((prev) =>
      prev.filter((word) => !wordsToDelete.includes(word.word))
    );
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header-wrapper">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <nav>
            <ul className="nav-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {isAnalyzing && <LoadingAnimation />}
      {!isAnalyzing && !showAnalysisOptions && <UploadArea onFileUpload={handleFileUpload} />}
      {error && <p className="error-text">{error}</p>}
      {!isAnalyzing && showAnalysisOptions && (
        <div>
          <button onClick={() => setShowAnalysisOptions("word")} className="analysis-button">
            Word Analysis
          </button>
          <button onClick={() => setShowAnalysisOptions("frequency")} className="analysis-button">
            Frequency Analysis
          </button>

          {showAnalysisOptions === "word" && <WordAnalysis analysisData={analysisData} />}
          {showAnalysisOptions === "frequency" && (
            <FrequencyAnalysis wordFrequency={wordFrequency} onDelete={handleDeleteWords} />
          )}
        </div>
      )}

      <style jsx>{`
        .header-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2vh 4vw; /* Responsive margins */
          background-color: rgba(51, 51, 51, 0.8); /* Translucent background */
          color: white;
          max-width: 100vw;
          margin: 0 auto;
        }
        .logo {
          height: 5vh;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 2vw;
          margin: 0;
          padding: 0;
        }
        .nav-links li a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-links li a:hover {
          color: #f0a500; /* Hover effect */
        }
        .analysis-button {
          margin: 2vh 1vw;
          padding: 2vh 2vw;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        .error-text {
          color: red;
        }
        body {
          margin: 0;
          padding: 0;
          padding-top: 10vh; /* Adjust for fixed header */
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;