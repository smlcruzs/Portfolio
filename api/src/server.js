const express = require('express');
const cors = require('cors');
const profileData = require('./data/profileData');
const feedbackHandler = require('./api/feedback');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rota do perfil
app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

// Rota do feedback (Google Sheets)
app.post('/api/feedback', feedbackHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});