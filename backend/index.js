const express = require('express');
const sequelize = require('./config/database');
const mainRoutes = require('./routes'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// FIX: Whitelist the actual FRONTEND domain names
app.use(cors({
  origin: [
    'http://localhost:3000',                            // For local dev frontend
    'https://quantmvp-production-6066.up.railway.app'   // Your production Railway frontend
  ],
  credentials: true
}));

app.use(express.json());

// Mount the central router
app.use('/api', mainRoutes);

// Sync database and start server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });