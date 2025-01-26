const axios = require('axios');
const fs = require('fs');
const { calculateWordCount, calculateCharacterCount, calculateSentenceCount, calculateAverageWordLength, calculateWordFrequency } = require('../utils/textAnalysis');
require('dotenv').config();

// Function to analyze the document
async function analyzeDocument(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
  const key = process.env.AZURE_FORM_RECOGNIZER_KEY;
  const url = `${endpoint}/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-07-31`;

  try {
    // Make the API call to start the analysis
    const response = await axios.post(url, fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Ocp-Apim-Subscription-Key': key,
      },
    });

    const operationLocation = response.headers['operation-location'];

    // Poll the operation-location to get the result
    let isFinished = false;
    let retryCount = 0;
    let resultData = null;

    while (!isFinished && retryCount < 5) { 
      const resultResponse = await axios.get(operationLocation, {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
        },
      });

      if (resultResponse.data.status === 'succeeded') {
        resultData = resultResponse.data.analyzeResult;
        isFinished = true;
      } else if (resultResponse.data.status === 'failed') {
        console.error('Analysis failed:', resultResponse.data);
        isFinished = true;
      } else {
        console.log('Analysis in progress...');
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, 5000)); // Retry after 5 seconds
      }
    }

    // If results are available, format and return the data
    if (resultData) {

      const text = resultData.paragraphs
        .map(paragraph => paragraph.content) // Extract content from paragraphs
        .join('\n');


      // Perform the required analysis
      const wordCount = calculateWordCount(text);
      const charCountWithSpaces = calculateCharacterCount(text);
      const charCountWithoutSpaces = calculateCharacterCount(text, true);
      const sentenceCount = calculateSentenceCount(text);
      const avgWordLength = calculateAverageWordLength(text);
      const wordFrequency = calculateWordFrequency(text);

      // Return the analyzed data
      return {
        wordCount,
        charCountWithSpaces,
        charCountWithoutSpaces,
        sentenceCount,
        avgWordLength,
        wordFrequency
      };
    }

    throw new Error('Analysis failed or no data found');
  } catch (error) {
    console.error('Error during analysis:', error);
    throw new Error('Failed to analyze document');
  }
}

module.exports = { analyzeDocument };
