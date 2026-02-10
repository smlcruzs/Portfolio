const express = require('express');
const cors = require('cors');
const profileData = require('./data/profileData');

const app = express();
const PORT = 3001;

app.use(cors()); 
app.use(express.json());

app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});