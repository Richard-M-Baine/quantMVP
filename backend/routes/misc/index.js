const express = require('express');
const router = express.Router();
const { CountyCrime, JudgeCrime, Kettlehundes, nationOne, TwoNation, TotalCrime, CrimeData} = require('../../models');

const Sequelize = require('sequelize'); // Import sequelize to use its functions
const { Op } = require('sequelize'); // Import Sequelize operators


router.get('/search', async (req, res) => {
  try {
    console.log('look at me in search')
    const listOfCrimes = await TotalCrime.findAll({
      attributes: ['Offense', 'id'],
      raw: true
    })
    console.log(listOfCrimes)
  
    res.json(listOfCrimes);     
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'You fucked up in your search in crime landing page' });
  }
});


module.exports = router;