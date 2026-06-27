import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './misconduct.css';

import MisconductCard from './MisconductCard/index.js'

import { fetchMisconductSearchThunk } from '../../../store/misconduct.js'

function MisconductSearch() {
  const dispatch = useDispatch()

  const [rank, setRank] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [stateAbbreviation, setStateAbbreviation] = useState('');
  const [stateError, setStateError] = useState('');
  const [agency, setAgency] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsPerPage = 15;

  // A simple list of valid state abbreviations
  const validStateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleStateChange = (e) => {
    const value = e.target.value.toUpperCase(); // Convert to uppercase for consistency
    setStateAbbreviation(value);

    if (value.length > 2) {
      setStateError('State abbreviation must be 2 characters.');
    } else if (value.length > 0 && !validStateAbbreviations.includes(value)) {
      // This will only show an error if the user has typed a full, but invalid, abbreviation
      setStateError('Invalid state abbreviation.');
    } else {
      setStateError('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Final check before submission
    const isValidState = stateAbbreviation === '' || validStateAbbreviations.includes(stateAbbreviation);

    if (stateAbbreviation && !isValidState) {
      setStateError('Please enter a valid state abbreviation.');
      return; // Stop form submission
    }

    const searchMisconductGroup = {
      dienstGrad: rank,
      ersteName: firstName,
      zweiteName: lastName,
      land: stateAbbreviation,
      Amtstelle: agency,
    }

    
    await dispatch(fetchMisconductSearchThunk(searchMisconductGroup))
    setHasSearched(true);
    setCurrentPage(0); // Reset to first page on new search
  };

  const handleReset = () => {
    setRank('');
    setFirstName('');
    setLastName('');
    setStateAbbreviation('');
    setStateError('');
    setAgency('');
    setCurrentPage(0);
    setHasSearched(false);
    // Optionally clear the Redux state here if you have a clear action
    // dispatch(clearMisconductResults());
  };

  // Get results and pagination data
  const misconducts = useSelector(state => state?.misconduct ?? {});
  const misconductList = misconducts ? Object.values(misconducts) : [];

  // Calculate pagination
  const totalResults = misconductList.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = currentPage * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = misconductList.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="MisconductSearchMain">
      <h1>Search Misconduct Cases</h1>
      <form onSubmit={handleFormSubmit}>

        <div className="form-glump">
          <label>Rank</label>
          <input
            type="text"
            id="rank"
            name="rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label>Officer First Name:</label>
          <input
            type="text"
            id="officerFirstName"
            name="officerFirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label htmlFor="officerName">Officer Last Name:</label>
          <input
            type="text"
            id="OfficerlastName"
            name="OfficerlastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label htmlFor="stateAbbreviation">State (abbreviation)</label>
          <input
            type="text"
            id="stateAbbreviation"
            name="stateAbbreviation"
            value={stateAbbreviation}
            onChange={handleStateChange}
            maxLength="2" // Limit input to 2 characters
          />
          {stateError && <p className="error-message">{stateError}</p>}
        </div>

        <div className="form-glump">
          <label htmlFor="officerName">Department / Agency</label>
          <input
            type="text"
            id="agency"
            name="agency"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            disabled={!!stateError} // Disable button if there's an error
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results section */}
      <div className='results-section'>
        {!hasSearched ? (
          <div className="no-search-message">
            <p>Enter search criteria above to find misconduct cases.</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="no-results-message">
            <p>No misconduct cases found matching your search criteria.</p>
          </div>
        ) : (
          <>
            {/* Results summary and pagination controls */}
            <div className="results-header">
              <p className="results-count">
                Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults} results
              </p>

              {totalPages > 1 && (
                <div className="pagination-controls">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className="pagination-btn"
                  >
                    Previous {resultsPerPage}
                  </button>

                  <span className="page-info">
                    Page {currentPage + 1} of {totalPages}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className="pagination-btn"
                  >
                    Next {resultsPerPage}
                  </button>
                </div>
              )}
            </div>

            {/* Results grid */}
            <div className='groupsAllPart'>
              {currentResults.map(misconduct => (
                <MisconductCard misconduct={misconduct} key={misconduct.id} />
              ))}
            </div>

            {/* Bottom pagination (optional - for convenience when scrolling down) */}
            {totalPages > 1 && (
              <div className="pagination-controls bottom-pagination">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="pagination-btn"
                >
                  Previous 10
                </button>

                <span className="page-info">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className="pagination-btn"
                >
                  Next 10
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MisconductSearch;