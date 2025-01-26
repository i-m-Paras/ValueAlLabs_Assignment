const fs = require('fs');

// Function to delete a file after processing
function cleanupFile(filePath) {
  fs.unlinkSync(filePath);  // Delete the uploaded file from the server
}

module.exports = { cleanupFile };
