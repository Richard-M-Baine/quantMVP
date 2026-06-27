const express = require('express');
const router = express.Router();
const { TotalCrime } = require('../../models');


router.get('/search', async (req, res) => {
  try {
    const listOfCrimes = await TotalCrime.findAll({
      attributes: ['Offense', 'id'],
      raw: true
    })
  
    res.json(listOfCrimes);     
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'You fucked up in your search in crime landing page' });
  }
});


module.exports = router;
