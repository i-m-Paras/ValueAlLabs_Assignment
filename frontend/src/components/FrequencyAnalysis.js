import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
      <h2 className="heading">Word Frequency Chart:</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={wordFrequency.slice(0, 10)}>
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyAnalysis;
