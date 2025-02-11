import React from "react";
import "../styles/WordAnalysis.css";

const WordAnalysis = ({ analysisData }) => {
  return (
    <div className="analysis-result">
      <h2 className="heading">Word Analysis:</h2>
      <p className="analysis-item"><strong>Word Count:</strong> {analysisData.wordCount}</p>
      <p className="analysis-item"><strong>Character Count (with spaces):</strong> {analysisData.charCountWithSpaces}</p>
      <p className="analysis-item"><strong>Character Count (without spaces):</strong> {analysisData.charCountWithoutSpaces}</p>
      <p className="analysis-item"><strong>Sentence Count:</strong> {analysisData.sentenceCount}</p>
      <p className="analysis-item"><strong>Average Word Length:</strong> {analysisData.avgWordLength}</p>
    </div>
  );
};

export default WordAnalysis;
