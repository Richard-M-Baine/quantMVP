import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';
import "./judgeCompareCrime.css";

import { fetchJudgesBasedOnCrimesThunk } from "../../../store/judge";

function JudgeCompareCrime() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);





  const crimeList = useSelector((state) => state.judge.judgeCrimeList);
 const crime = useSelector((state) => state.judge.crime);


  useEffect(() => {
    dispatch(fetchJudgesBasedOnCrimesThunk(id)).then(() => setLoaded(true));
  }, [dispatch, id]);

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/judges");
    }
  };

  






  if (!loaded) {
    return <p>wait a bloody minute...</p>;
  }

  console.log(crime, "i am total Crime List")
  console.log(crimeList, "i am Judge Crime List")



  return (
  <div className="judgecompareCrime">
    <div className="compareHeaderDiv">
      <button className="btn btn-primary" onClick={handleGoBack}>
        Go Back
      </button>
     
      <h2>
        {crimeList[0]?.Judge}'s Top 4 Most Frequently Sentenced Crimes vs. State Averages
      </h2>
    </div>

    {/* The main grid layout */}
    <div className="compareSectionJudgeCompareCrime">
      
      {/* --- ROW 1: HEADERS --- */}
      <div className="headerOfComparisonJudgeCompareCrime">Offense</div>
      <div className="headerOfComparisonJudgeCompareCrime">Total Cases</div>
      <div className="headerOfComparisonJudgeCompareCrime">Avg Incarceration (Days)</div>
      <div className="headerOfComparisonJudgeCompareCrime">Avg Probation (Months)</div>
      <div className="headerOfComparisonJudgeCompareCrime">State Benchmarks</div>

     {crimeList.slice(0, 4).map((crimeItem, index) => {
  
  const matchingStateCrime = crime.find(
    (stateCrime) => stateCrime.Offense === crimeItem.Offense
  );

  return (
    <React.Fragment key={index}>
      {/* Offense */}
      <div className="compareCell" style={{ fontWeight: '600' }}>
        {crimeItem.Offense}
      </div>

      {/* Total Cases */}
      <div className="compareCell">
        {crimeItem.TotalCasesYear}
      </div>

      {/* Avg Incarceration */}
      <div className="compareCell">
        {parseFloat(crimeItem.AverageIncarcerationYear).toFixed(2)} days
      </div>

      {/* Avg Probation */}
      <div className="compareCell">
        {parseFloat(crimeItem.AverageProbationMonth).toFixed(2)} mos
      </div>

      {/* State Comparison Data Column */}
      <div className="compareCell">
        <div className="stateDataContainer">
          
          <div className="stateDataRow">
            <span>State Case Count:</span>
            <strong>
              {matchingStateCrime?.TotalCasesDays || 'N/A'}
            </strong>
          </div>

          <div className="stateDataRow">
            <span>State Avg Sentence (days):</span>
            <strong>
              {matchingStateCrime?.AverageIncarcerationDays
                ? parseFloat(
                    matchingStateCrime.AverageIncarcerationDays
                  ).toFixed(2)
                : 'N/A'} d
            </strong>
          </div>

          <div className="stateDataRow">
            <span>State Avg Probation (months):</span>
            <strong>
              {matchingStateCrime?.AverageProbationMonth
                ? parseFloat(
                    matchingStateCrime.AverageProbationMonth
                  ).toFixed(2)
                : 'N/A'} m
            </strong>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
})}

    </div>
  </div>
);
}

export default JudgeCompareCrime;
