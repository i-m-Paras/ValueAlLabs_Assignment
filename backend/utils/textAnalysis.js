// Function to calculate word count
function calculateWordCount(text) {
    const sanitizedText = text.replace(/\n/g, ' '); // Replace newlines with spaces
    return sanitizedText.trim().split(/\s+/).filter(Boolean).length;
  }
  
  // Function to calculate character count (with and without spaces)
  function calculateCharacterCount(text, withoutSpaces = false) {
    const sanitizedText = text.replace(/\n/g, ' '); // Replace newlines with spaces
    const processedText = withoutSpaces ? sanitizedText.replace(/\s+/g, '') : sanitizedText;
    return processedText.length;
  }
  
  // Function to calculate sentence count
  function calculateSentenceCount(text) {
    const sanitizedText = text.replace(/\n/g, ' '); // Replace newlines with spaces
    const sentences = sanitizedText.split(/[.!?]+/).filter(sentence => sentence.trim());
    return sentences.length;
  }
  
  // Function to calculate average word length
  function calculateAverageWordLength(text) {
    const sanitizedText = text.replace(/\n/g, ' '); // Replace newlines with spaces
    const words = sanitizedText.trim().split(/\s+/).filter(Boolean);
    const totalLength = words.reduce((acc, word) => acc + word.length, 0);
    return words.length > 0 ? (totalLength / words.length).toFixed(2) : 0; // Return 0 if no words
  }
  
  // Function to calculate word frequency
  function calculateWordFrequency(text) {
    const sanitizedText = text
      .toLowerCase() // Normalize to lowercase
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/[^\w\s]/g, '') // Remove non-alphanumeric characters except spaces
      .split(/\s+/) // Split into words
      .filter(Boolean); // Remove empty entries
  
    const frequency = sanitizedText.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  
    // Sort by frequency (desc) and return the top 20 words
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
  