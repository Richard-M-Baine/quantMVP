import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountyCrimeSearchThunk } from '../../../store/county';
import './countySearch.css';
import { Link } from 'react-router-dom';

function CountySearch({ county, redirect = false }) {
  const dispatch = useDispatch();
  
  // Fixed selector to match your actual state structure
  const countyList = useSelector(state => state?.county?.[0]?.countyCrimeResults ?? []);

  const [crime, setCrime] = useState('');
  const [sentence, setSentence] = useState('');
  const [probation, setProbation] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searched, setSearched] = useState(false);
  const resultsPerPage = 15;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const searchCrimeGroup = { county, crime, sentence, probation };

    try {
      await dispatch(fetchCountyCrimeSearchThunk(searchCrimeGroup));
      setSearched(true);
      setCurrentPage(0);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleReset = () => {
    setCrime('');
    setSentence('');
    setProbation('');
    setCurrentPage(0);
    setSearched(false);
  };

  const totalResults = countyList.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = currentPage * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = countyList.slice(startIndex, endIndex);

  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  return (
    <div>
      <form className="countySearchForm" onSubmit={handleFormSubmit}>
        <div className="countySearchFormDiv">
          <label>Crime</label>
          <input type="text" value={crime} onChange={e => setCrime(e.target.value)} />
        </div>

        <div className="countySearchFormDiv">
          <label>Average Incarceration Length (days) above:</label>
          <input type="text" value={sentence} onChange={e => setSentence(e.target.value)} />
        </div>

        <div className="countySearchFormDiv">
          <label>Average probation sentence above:</label>
          <input type="text" value={probation} onChange={e => setProbation(e.target.value)} />
        </div>

        <div className="button-group">
          <button className='countySearchResultButtons'  type="submit">Search</button>
          <button className='countySearchResultButtons' type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      <div className='results-section'>
        {!searched ? (
          <p>Enter search criteria above to find misconduct cases.</p>
        ) : totalResults === 0 ? (
          <p>No misconduct cases found matching your search criteria.</p>
        ) : (
          <>
            <div className="results-header">
              <p>
                Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults} results
              </p>
            </div>

            <div className='groupsAllPart'>
              {currentResults.map((result, index) => (
                <div key={result.id} className="crime-result-link">
                  <Link to={`/county/compare/${county}/${result.id}`}>{result.Offense}</Link>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button className='countySearchResultButtonsBottom' onClick={goToPrevPage} disabled={currentPage === 0}>Prev {resultsPerPage}</button>
                <span className='spanCountySearch'>Page {currentPage + 1} of {totalPages}</span>
                <button className='countySearchResultButtonsBottom' onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>Next {resultsPerPage}</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CountySearch;
