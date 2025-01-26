import React from "react";

const WordAnalysis = ({ analysisData }) => {
  return (
    <div className="analysis-result">
      <h2>Word Analysis:</h2>
      <p><strong>Word Count:</strong> {analysisData.wordCount}</p>
      <p><strong>Character Count (with spaces):</strong> {analysisData.charCountWithSpaces}</p>
      <p><strong>Character Count (without spaces):</strong> {analysisData.charCountWithoutSpaces}</p>
      <p><strong>Sentence Count:</strong> {analysisData.sentenceCount}</p>
      <p><strong>Average Word Length:</strong> {analysisData.avgWordLength}</p>
    </div>
  );
};

export default WordAnalysis;
