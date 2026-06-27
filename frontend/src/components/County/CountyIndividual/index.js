import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useParams, Link } from "react-router-dom";

import './individual.css';
import { fetchIndividualCountyJudgesThunk } from '../../../store/county';
import { fetchAllJudgesInCountyThunk } from '../../../store/judge';
import CountySearch from "../CountySearch";

function CountyIndividual() {
  const { county } = useParams();
  const dispatch = useDispatch();

  const compareData = useSelector(state => state.county?.[0]?.countyData || []);
  const totalCrimeLanding = useSelector(state => state.county?.[1]?.totalCrime || {});
  const judges = useSelector(state => state.judge || []);

  const [loaded, setLoaded] = useState(false);
  const [judgesVisible, setJudgesVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchIndividualCountyJudgesThunk(county));
      await dispatch(fetchAllJudgesInCountyThunk(county));
      setLoaded(true);
    }
    fetchData();
  }, [county, dispatch]);

  const toggleJudges = () => setJudgesVisible(!judgesVisible);

  if (!loaded) return <div className="loading">Loading {county} County data...</div>;

  return (
    <div className="mainCountyLanding">
      <div className="content-left">
        <h1>All About {county} County</h1>

        {/* Inline Search */}
        <section className="county-hero">
          <div className="hero-content">
            <h2>Search Specific County Data</h2>
            <p>
              Compare sentencing patterns from {county} County with other counties and differences in judge's sentencing behavior.  
              First search for a specific crime or other criteria.  After you select an offense you will be able to compare judge's in {county} with each other and the county with other counties.
            </p>

            {/* Search form without redirect */}
            <CountySearch county={county} redirect={false} />
          </div>
        </section>

        {/* Featured Crime Analysis */}
        <section className="compare-one-county">
          <h2>Featured Crime Analysis</h2>
          {compareData.length > 0 ? (
            <div className="crime-block">
              <h4>Random Spotlight</h4>
              <h3>{totalCrimeLanding.Offense}</h3>
              <p><strong>Average Sentence Statewide (days): </strong> {totalCrimeLanding.AverageIncarcerationDays}</p>
              <p><strong>Average Probation Sentence (months): </strong> {totalCrimeLanding.AverageProbationMonth}</p>
              <p><strong>Total Cases Statewide:</strong> {totalCrimeLanding.TotalCasesDays}</p>

              <div className="judge-cards">
                {compareData.map(judge => (
                  <div key={judge.id} className="judge-card">
                    <h5>{judge.Judge}</h5>
                    <p>Average Incarceration (days): {judge.AverageIncarcerationYear}</p>
                    <p>Total sentences by judge: {judge.TotalCasesYear}</p>
                    <p>Average probation (months): {judge.AverageProbationMonth}</p>
                  
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>A random crime having 3 judges in the county cannot be found for {county}.  The backend is too lazy to try again.  Reload the page if you want to see one.</p>
          )}
        </section>
      </div>

      <aside className="judges-sidebar">
        <button className="judges-toggle-btn" onClick={toggleJudges} aria-expanded={judgesVisible}>
          {judgesVisible ? '← Hide' : `⚖️ Display All Judges in ${county}`}
        </button>
        <div className={`judges-content ${judgesVisible ? '' : 'collapsed'}`}>
          <h2>List of Judges</h2>
          <div className="judges-grid">
            {judges.length > 0 ? (
              judges.map(judge => (
                <div key={judge.id} className="judge-card">
                  <h4>{judge.Judge}</h4>
                  <Link to={`/judges/${judge.id}`} className="judge-link">
                    Search Judge's sentencing data →
                  </Link>
                </div>
              ))
            ) : <p>No judges found for {county} County.</p>}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CountyIndividual;
