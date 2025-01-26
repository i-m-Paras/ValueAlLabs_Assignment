import React, { useState } from "react";
import "../styles/FrequencyAnalysis.css";

const FrequencyAnalysis = ({ wordFrequency, onDelete }) => {
  const [selectedWords, setSelectedWords] = useState([]);

  const handleCheckboxChange = (word) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const handleDelete = () => {
    onDelete(selectedWords);
    setSelectedWords([]);
  };

  return (
    <div className="analysis-result">
      <h2 className="heading">Frequency Analysis:</h2>
      <ul className="word-list">
        {wordFrequency.slice(0, 20).map((word, index) => (
          <li key={index} className="word-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox"
                value={word.word}
                checked={selectedWords.includes(word.word)}
                onChange={() => handleCheckboxChange(word.word)}
              />
              <span className="animated-word">
                {word.word}: <span className="word-count">{word.count}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleDelete} className="delete-button">
        Delete Selected Words
      </button>
    </div>
  );
};

export default FrequencyAnalysis;
