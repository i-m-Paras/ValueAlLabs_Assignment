const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', fileRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
