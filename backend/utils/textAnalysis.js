// Function to calculate word count
function calculateWordCount(text) {
  const sanitizedText = text
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/[^\w\s’']/g, '') // Keep contractions (don’t, it’s)
    .trim();
  
  const words = sanitizedText.split(/\s+/).filter(Boolean);
  return words.length;
}

function calculateCharacterCount(text, withoutSpaces = false) {
  const sanitizedText = text.replace(/\n/g, ' '); // Replace newlines with spaces
  const processedText = withoutSpaces ? sanitizedText.replace(/\s+/g, '') : sanitizedText;
  return processedText.length;
}

function calculateSentenceCount(text) {
  const sanitizedText = text.replace(/\n/g, ' ').trim(); // Replace newlines with spaces
  const sentences = sanitizedText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  return sentences.length;
}

function calculateAverageWordLength(text) {
  const sanitizedText = text.replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/[^\w\s’']/g, '') // Remove punctuation but keep contractions
    .trim();
  
  const words = sanitizedText.split(/\s+/).filter(word => word.length > 1); // Ignore single-letter words
  const totalLength = words.reduce((acc, word) => acc + word.length, 0);
  
  return words.length > 0 ? (totalLength / words.length).toFixed(2) : "0.00";
}

function calculateWordFrequency(text) {
  const sanitizedText = text
    .toLowerCase() // Normalize to lowercase
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/[^\w\s’']/g, '') // Keep contractions
    .trim();

  const words = sanitizedText.split(/\s+/).filter(Boolean);
  const frequency = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(frequency)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));
}

  // Exporting all functions
  module.exports = {
    calculateWordCount,
    calculateCharacterCount,
    calculateSentenceCount,
    calculateAverageWordLength,
    calculateWordFrequency,
  };
  