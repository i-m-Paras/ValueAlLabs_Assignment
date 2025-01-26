const express = require('express');
const multer = require('multer');
const { analyzeDocument } = require('../services/azureService');
const { cleanupFile } = require('../utils/fileUtils');

const router = express.Router();

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Upload and process PDF
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Call Azure service to process the document
    const analysisResult = await analyzeDocument(filePath);

    
    // Clean up the uploaded file after analysis
    cleanupFile(filePath);

    // Return the results to the frontend
    res.status(200).json(analysisResult);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

module.exports = router;
