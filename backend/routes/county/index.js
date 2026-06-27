const express = require('express');
const router = express.Router();
const { CountyCrime, JudgeCrime, Kettlehundes, nationOne, TwoNation, TotalCrime } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions
const { Op } = require('sequelize'); // Import Sequelize operators

// Utility to strip out undefined/empty filters
const clean = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== "")
  );
};

// helper function for like things

function like(value) {
  if (!value) return undefined;

  return {
    [Op.like]: `%${value.trim()}%`
  };
}

const STATES = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia"
};

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


router.get('/landing', async (req, res) => {
  try {
    const randomOffense = await CountyCrime.findOne({
      attributes: ['Offense'],
      where: {
        TotalCasesYear: {
          [Op.gte]: 10,
        },
      },
      group: ['Offense'],
      having: sequelize.literal('COUNT(DISTINCT "County") >= 3'),
      order: sequelize.literal('RANDOM()'),
    });

    if (!randomOffense) {
      return res.status(404).json({
        message: 'No offense has at least 3 qualifying counties.',
      });
    }

    const countyLanding = await CountyCrime.findAll({
      where: {
        Offense: randomOffense.Offense,
        TotalCasesYear: {
          [Op.gte]: 10,
        },
      },
      order: sequelize.literal('RANDOM()'),
      limit: 3,
    });

    const response = countyLanding.map(record => {
      const json = record.toJSON();

      return {
        ...json,
        County: countyMap[json.County] || json.County,
      };
    });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/crimesearch', async (req, res) => {
  try {
    const { county, crime, sentence, probation } = req.query;

    const countyKey = Object.keys(countyMap).find(key => 
      countyMap[key].toLowerCase() === county.toLowerCase()
    );

    

    let countyCrimeSearchClean = {
      County: countyKey,
      Offense: crime,
      AverageIncarcerationLength: sentence,
      AverageProbation: probation,
    };

   
    countyCrimeSearchClean = clean(countyCrimeSearchClean);

    // Build where clauses with Op.like for partial matching
 
    const countyCrimeWhere = {};

     if (countyCrimeSearchClean.County) {
      
      countyCrimeWhere.County = countyCrimeSearchClean.County
    }
   
    if (countyCrimeSearchClean.Offense) {
      countyCrimeWhere.Offense = { [Op.like]: `%${countyCrimeSearchClean.Offense}%` };
    }
    if (countyCrimeSearchClean.AverageIncarcerationLength) {
      countyCrimeWhere.AverageIncarcerationLength = { [Op.gte]: countyCrimeSearchClean.AverageIncarcerationLength };
    }
    if (countyCrimeSearchClean.AverageProbation) {
      countyCrimeWhere.AverageProbation = { [Op.gte]: countyCrimeSearchClean.AverageProbation };
    }

    // Execute queries
    const countyCrimeSearchResults = await (

      CountyCrime.findAll({ where: countyCrimeWhere })

  )



    // Return all data including the unique offenses array
    const returnArray = [
    
      {countyCrimeResults: [...countyCrimeSearchResults]},

    ];
    

    res.json(returnArray);
  } catch (err) {
    console.error('Error in crimesearch:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


router.get('/misconduct', async (req, res) => {
  try {

    const { dienstgrad, ersteName, zweiteName, land, Amtstelle } = req.query;

  const normalizeState = (value) => {
  if (!value) return value;

  const upper = value.trim().toUpperCase();

  return STATES[upper] || value;
};

const stateSearch = normalizeState(land);

    // Build where clauses
    const kettleWhere = clean({
      rank: like(dienstgrad),
      firstName: like(ersteName),
      lastName: like(zweiteName),
      agency: like(Amtstelle),
       state: like(stateSearch)
    });

    const nationOneWhere = clean({
      rank: like(dienstgrad),
      firstName: like(ersteName),
      lastName: like(zweiteName),
       state: like(stateSearch),
      agency: like(Amtstelle)
    });

    const nationTwoWhere = clean({
      firstName: like(ersteName),
      lastName: like(zweiteName),
       state: like(stateSearch),
      agency: like(Amtstelle)
    });

    // Run queries in parallel
    const [kettleResults, nationOneResults, nationTwoResults] = await Promise.all([
      Kettlehundes.findAll({ where: kettleWhere }),
      nationOne.findAll({ where: nationOneWhere }),
      TwoNation.findAll({ where: nationTwoWhere })
    ]);



    // Normalize + tag results
    const normalizedKettle = kettleResults.map(r => ({
      rank: r.Rank,
      firstName: r.FirstName,
      lastName: r.LastName,
      country: r.Country,      // Verify this is the correct column name
      office: r.AgencyName,
      dataSet: "Kettlehundes",
      ...r.toJSON()
    }));

    const normalizedNationOne = nationOneResults.map(r => ({
      rank: null,
      firstName: r.FirstName,
      lastName: r.LastName,
      country: r.State,
      office: r.Agency,        // Verify capitalization matches your model
      dataSet: "NationOne",
      ...r.toJSON()
    }));

    const normalizedTwoNation = nationTwoResults.map(r => ({
      rank: null,
      firstName: r.FirstName,
      lastName: r.LastName,
      country: r.State,
      office: r.Agency,
      dataSet: "TwoNation",
      ...r.toJSON()
    }));

    res.json([
      ...normalizedKettle,
      ...normalizedNationOne,
      ...normalizedTwoNation
    ]);

  } catch (err) {
    console.error("Error fetching misconduct search:", err);
    res.status(500).json({ error: "Server error while searching misconduct" });
  }
});




router.get('/individual/:county', async (req, res) => {
  try {
    const countyName = req.params.county;
    
    // Convert county name to database key (reverse lookup in countyMap)
    const countyKey = Object.keys(countyMap).find(key => 
      countyMap[key].toLowerCase() === countyName.toLowerCase()
    );
    
    if (!countyKey) {
      return res.status(404).json({ message: 'County not found' });
    }

    const MAX_ATTEMPTS = 10; // prevent infinite loops
    let attempt = 0;
    let countyData = [];
    let randomOffense = null;

    while (attempt < MAX_ATTEMPTS) {
      attempt++;

      // Step 1: Pick random offense from JudgeCrimes
      const randomOffenseResult = await JudgeCrime.findOne({
        attributes: ['Offense'],
        order: sequelize.literal('RANDOM()'),
        limit: 1,
      });

      if (!randomOffenseResult) continue; // try again

      randomOffense = randomOffenseResult.Offense;

      // Step 2: Get 3 instances for this county and offense
      countyData = await JudgeCrime.findAll({
        where: { 
          County: countyKey,
          Offense: randomOffense 
        },
        order: sequelize.literal('RANDOM()'),
        limit: 3,
      });

      if (countyData.length >= 3) {
        // Found a good result → stop retrying
        break;
      }
    }

    if (countyData.length < 3) {
      return res.status(404).json({ 
        message: `Could not find 3 instances for ${countyName} after multiple attempts.` 
      });
    }

    // Step 3: Format county result
    const formattedCountyData = countyData.map(item => {
      const json = item.toJSON();
      return {
        ...json,
        County: countyMap[json.County] || json.County,
      };
    });

    // Step 4: Get total state-level data for same offense
    const totalStates = await TotalCrime.findOne({
      where: { Offense: randomOffense }
    });

    // Step 5: Merge and return
 return res.json([
  { countyData: formattedCountyData },
  { totalCrime: totalStates ? totalStates.toJSON() : null }
]);


  } catch (error) {
    console.error("Error fetching individual county data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// get all county results based on an offense crimeId of one county
// also returns all judges in the county that sentenced someone for that offense


router.get('/:county/crimeId/:crimeId', async (req, res) => {

  try {
    const { county, crimeId } = req.params;
    
   

    if (!county || !crimeId) {
      return res.status(400).json({ error: 'Missing required query parameters: county and crimeId' });
    }

    const countyCrime = await CountyCrime.findOne({
  where: { id: crimeId },
  attributes: ['Offense'],
  raw: true
});

const offense = countyCrime.Offense
   const countyKey = Object.keys(countyMap).find(key => 
      countyMap[key].toLowerCase() === county.toLowerCase())

   const countyCrimes = await CountyCrime.findAll({
      where: {Offense: offense}
    })

    const judgeCrimes = await JudgeCrime.findAll({
      where: {
        county: countyKey,
        Offense: offense
      }
    })

    res.json({ countyCrimes, judgeCrimes });
  } catch (err) {
    console.error('Error fetching county crime data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});







module.exports = router;
