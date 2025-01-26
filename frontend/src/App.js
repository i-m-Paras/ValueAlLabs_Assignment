import React, { useState } from "react";
import axios from "axios";
import UploadArea from "./components/UploadArea";
import LoadingAnimation from "./components/LoadingAnimation";
import WordAnalysis from "./components/WordAnalysis";
import FrequencyAnalysis from "./components/FrequencyAnalysis";

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
    </div>
  );
};

export default App;
