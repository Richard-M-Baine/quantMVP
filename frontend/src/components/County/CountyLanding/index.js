import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchCountyLandingSampleThunk } from '../../../store/county.js';
import './countyLanding.css';

function CountyLanding() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [showIncarceration, setShowIncarceration] = useState(false)

  const countyListState = useSelector(state => state?.county);

  useEffect(() => {
    dispatch(fetchCountyLandingSampleThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return <p>wait a bloody minute...</p>;
  }

  const countiesObject = {
    atlantic: {
      id: 1,
      name: 'Atlantic',
    },
    bergen: {
      id: 2,
      name: 'Bergen',
    },
    burlington: {
      id: 3,
      name: 'Burlington',
    },
    camden: {
      id: 4,
      name: 'Camden',
    },
    cape_may: {
      id: 5,
      name: 'Cape May',
    },
    cumberland: {
      id: 6,
      name: 'Cumberland',
    },
    essex: {
      id: 7,
      name: 'Essex',
    },
    gloucester: {
      id: 8,
      name: 'Gloucester',
    },
    hudson: {
      id: 9,
      name: 'Hudson',
    },
    hunterdon: {
      id: 10,
      name: 'Hunterdon',
    },
    mercer: {
      id: 11,
      name: 'Mercer',
    },
    middlesex: {
      id: 12,
      name: 'Middlesex',
    },
    monmouth: {
      id: 13,
      name: 'Monmouth',
    },
    morris: {
      id: 14,
      name: 'Morris',
    },
    ocean: {
      id: 15,
      name: 'Ocean',
    },
    passaic: {
      id: 16,
      name: 'Passaic',
    },
    salem: {
      id: 17,
      name: 'Salem',
    },
    somerset: {
      id: 18,
      name: 'Somerset',
    },
    sussex: {
      id: 19,
      name: 'Sussex',
    },
    union: {
      id: 20,
      name: 'Union',
    },
    warren: {
      id: 21,
      name: 'Warren',
    },
  };

  const incarcerationClick = () => {
    setShowIncarceration(true)
  }

  const probationClick = () => {
    setShowIncarceration(false)
  }
  // Assuming counties is an object {id: {name, abbreviation, ...}, ...}
  const countyList = Object.values(countiesObject);

  return (
    <div className="mainCountyLanding">

      {/* Top Section: County Navigation */}
      <section className="countyNavSection">
        <h1>Explore New Jersey by County</h1>
        <div className="countyGrid">
          {countyList.map(county => (
            <Link
              key={county.id}
              to={`/county/${county.name}`}
              className="countyLink"
            >
              {county.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Middle Section: Misconduct Records */}
      <section className="misconductSection">
        <h2>Police Misconduct Records</h2>
        <p>
          In New Jersey, police disciplinary records are public.
          Browse available misconduct records nationwide.  Some states are more detailed than others.
        </p>
        <div className="misconductLinks">
          <Link to="/misconduct">Search Nationwide Decertifications and Misconduct</Link>
        </div>
      </section>

{/* Bottom Section: Sample Spotlight */}
<section className="sampleSection">
  <h2>Crime Spotlight</h2>
  <h3>
    {countyListState[0].Offense}
  </h3>

  <div className='buttonDivCountyLanding'>
    <p>Switch Between incarceration / probation data</p>
    <div className='buttonDivButtons'>
      <button onClick={probationClick}>Probation</button>
      <button onClick={incarcerationClick}>Jail / Prison</button>
    </div>
  </div>

 
 {/* Incarceration */}
{showIncarceration && (
  <div className="sampleGrid">
    <h2 className="countyLandingSampleHeader">Incarceration Data</h2>
    <div className="sampleGridCards">
      {countyListState.slice(0, 3).map(county => (
        <div key={county.id} className="sampleCard">
          <h3>{county.County}</h3>
          <p>instances in dataset {county.TotalCasesYear}</p>
          <p>average incarceration length (days) {county.AverageIncarcerationLength}</p>
          <p>median: {county.MedianSentence}</p>
          <p>mode: {county.ModeSentence}</p>
          <p>Max length: {county.MaxSentence || "N/A"}</p>
          <p>Min length: {county.MinSentence || "N/A"}</p>
          <p>standard deviation {county.StdDevSentence}</p>
        </div>
      ))}
    </div>
  </div>
)}

{/* Probation */}
{!showIncarceration && (
  <div className="sampleGridProbation">
    <h2 className="countyLandingSampleHeader">Probation Data</h2>
    <div className="sampleGridCards">
      {countyListState.slice(0, 3).map(county => (
        <div key={county.id} className="sampleCard">
          <h3>{county.County}</h3>
          <p>instances in dataset {county.TotalProbationInstances}</p>
          <p>average probation length (months) {county.AverageProbation}</p>
          <p>median: {county.MedianProbation}</p>
          <p>mode: {county.ModeProbation}</p>
          <p>Max length: {county.MaxProbation || "N/A"}</p>
          <p>Min length: {county.MinProbation || "N/A"}</p>
          <p>standard deviation {county.StdDevProbation}</p>
        </div>
      ))}
    </div>
  </div>
)}
</section>


    </div>
  );
}

export default CountyLanding;
