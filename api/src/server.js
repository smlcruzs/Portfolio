const express = require('express');
const cors = require('cors');
const path = require('path');
const profileData = require('./data/profileData');
const feedbackHandler = require('./api/feedback');

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---
app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

app.post('/api/feedback', feedbackHandler);

// --- SERVE O FRONTEND (React buildado) ---
const frontendPath = path.join(__dirname, '..', 'web', 'dist');
app.use(express.static(frontendPath));

// Qualquer rota que não seja /api/* serve o index.html do React
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});