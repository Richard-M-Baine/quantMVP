const express = require('express');
const sequelize = require('./config/database');
const mainRoutes = require('./routes'); // Import the central router

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount the central router
app.use('/api', mainRoutes);

// Sync database and start server
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });