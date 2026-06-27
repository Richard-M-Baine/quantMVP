const express = require('express');
const router = express.Router();
const { CountyCrime, JudgeCrime, Kettlehundes, nationOne, TwoNation, TotalCrime, CrimeData} = require('../../models');

const Sequelize = require('sequelize'); // Import sequelize to use its functions
const { Op } = require('sequelize'); // Import Sequelize operators

// Utility to strip out undefined/empty filters
const clean = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== "")
  );
};

function averagePercentages(...objects) {
  const values = objects
    .flatMap(obj => Object.values(obj))
    .filter(v => typeof v === 'number');

  if (values.length === 0) return 0;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}





const countyMap = {
  ATL: "Atlantic",
  BER: "Bergen",
  BUR: "Burlington",
  CAM: "Camden",
  CPM: "Cape May",
  CUM: "Cumberland",
  ESS: "Essex",
  GLO: "Gloucester",
  HUD: "Hudson",
  HNT: "Hunterdon",
  MER: "Mercer",
  MID: "Middlesex",
  MON: "Monmouth",
  MRS: "Morris",
  OCN: "Ocean",
  PAS: "Passaic",
  SLM: "Salem",
  SOM: "Somerset",
  SSX: "Sussex",
  UNI: "Union",
  WAR: "Warren"
};


router.get('/judge', async (req, res) => {
  const {offense } = req.query

  const searchObject = {}
 
      
         searchObject.Offense = { [Op.like]: `%${offense}%` };
      



      searchTotalCrimes = await TotalCrime.findAll({ where: searchObject });

      res.json(searchTotalCrimes)
    
});

router.get('/judge/:id', async (req, res) => {
  try {
    const crimeId = req.params.id;

    const theCrime = await TotalCrime.findByPk(crimeId)

    res.json(theCrime)

    

  } catch (error) {
    console.error('Error in /crime/:id route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/landing', async (req, res) => {
  try {
    
const crimes = await TotalCrime.findAll({
  order: Sequelize.literal('RANDOM()'),
  limit: 100,
  include: [{
    model: CrimeData,
    as: 'crimeData'
  }]
});

const crime = crimes.find(c =>
  Object.keys(c.crimeData.IncidentsPerYear || {}).length > 4
);

const averageIncarceration = averagePercentages(
  crime.crimeData.IncarcerationPercentage

);

const averageProbation = averagePercentages(  crime.crimeData.probationPercentage)

const result = crime.toJSON();

result.crimeData.averageIncarceration = averageIncarceration;
result.crimeData.averageProbation = averageProbation;

res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/individual/:id', async (req, res) => {
  try {
    const id = req.params.id
const crime = await TotalCrime.findByPk(id,{
 
});

const crimeData = await CrimeData.findByPk(id,{

})


const averageIncarceration = averagePercentages(
  crimeData.IncarcerationPercentage

);

const averageProbation = averagePercentages(  crimeData.probationPercentage)

const result = crime.toJSON();
const resultData = crimeData.toJSON();

resultData.averageIncarceration = averageIncarceration;
resultData.averageProbation = averageProbation;

result.crimeData = resultData;

res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  
  }})


  

module.exports = router;
