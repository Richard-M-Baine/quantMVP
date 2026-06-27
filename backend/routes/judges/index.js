const express = require('express');
const router = express.Router();

const { Judge, JudgeCrime, TotalCrime, CountyCrime } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions
const { Op } = require('sequelize'); // Import Sequelize operators
const { off } = require('process');

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

const clean = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== "")
  );
}
// Example route
router.get('/all/:county', async (req, res) => {
  const countyName = req.params.county;

  // Find the county key based on the county name
  const countyKey = Object.keys(countyMap).find(key => countyMap[key] === countyName);

  // If a key is found, perform the search
  if (countyKey) {
    try {
      const judgeList = await Judge.findAll({
        where: { County: countyKey },
      });
      // Respond with the list of judges
      res.json(judgeList);
    } catch (error) {
      // Handle potential errors
      console.error(error);
      res.status(500).send('An error occurred while fetching judges.');
    }
  } else {
    // Handle the case where the county is not found in the map
    res.status(404).send('County not found.');
  }
});

router.get('/search', async (req, res) => {
  const { lastName, county, offense } = req.query;
  console.log('i am county ',county)

  const countyKey = Object.keys(countyMap).find(key => 
      countyMap[key].toLowerCase() === county.toLowerCase()
    );

  console.log(lastName, countyKey, offense);




    // Judge search conditions
    const judgeWhere = {};
    if (lastName) {
      judgeWhere.Judge = { [Op.like]: `%${lastName}%` };
    }
    if (countyKey) {
      judgeWhere.County = countyKey;
    }

    // Always search judges
    const searchJudges = await Judge.findAll({ where: judgeWhere });




    
    // Only search JudgeCrime if offense is provided
    let searchJudgeCrimes = [];
    if (offense) {
      const judgeCrimeWhere = {
        Offense: offense // exact match
      };



      searchJudgeCrimes = await JudgeCrime.findAll({ where: judgeCrimeWhere });
    }

    // If no results at all
    if (searchJudges.length === 0 && searchJudgeCrimes.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }




    res.json([
      searchJudges,
      searchJudgeCrimes
    ]);

   
});



router.get('/crime/:id', async (req, res) => {
  try {
    const judgeId = req.params.id;

    // Find judge
    const judge = await Judge.findOne({
      where: { id: judgeId }
    });

    if (!judge) {
      return res.status(404).json({ error: 'Judge not found' });
    }

    // Top 4 crimes
    const topJudgeCrimes = await JudgeCrime.findAll({
      where: { Judge: judge.Judge },

      order: [['TotalCasesYear', 'DESC']],

      limit: 4
    });

    // ["Burglary", "Robbery", etc]
    const arrayOfCrimes = topJudgeCrimes.map(
      crime => crime.Offense
    );

    // Find matching TotalCrime rows
    const totalCrimeDataUnordered = await TotalCrime.findAll({
      where: {
        Offense: {
          [Op.in]: arrayOfCrimes
        }
      }
    });

    // Reorder to match arrayOfCrimes
const totalCrimeData = arrayOfCrimes
  .map(offense =>
    totalCrimeDataUnordered.find(
      crime => crime.Offense === offense
    )
  )
  .filter(Boolean); // removes undefined if something doesn't match



    res.json({
      topJudgeCrimes,
      totalCrimeData
    });

  } catch (error) {
    console.error('Error in /crime/:id route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/crime/all/:id', async (req, res) => {
  const crimeId = req.params.id


  const crime = await TotalCrime.findOne({
    where: {
      id: crimeId
    }
  })

  const crimeName = crime.dataValues.Offense

  const judgeList = await JudgeCrime.findAll({
    where: {
      Offense: crimeName
    },
    raw: true
  })

  console.log('im judgeList! ',judgeList)
res.json(judgeList)
})




module.exports = router