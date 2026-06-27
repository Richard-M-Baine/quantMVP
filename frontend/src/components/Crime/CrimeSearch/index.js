import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './crimeSearch.css';
import { useDispatch, useSelector } from 'react-redux';

import {fetchListOfCrimesThunk} from '../../../store/misc.js'




function CrimeSearch() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);



  const navigate = useNavigate();
  const wrapperRef = useRef(null);

   useEffect(() => {
    dispatch(fetchListOfCrimesThunk()).then(() => setLoaded(true));
  }, [dispatch]);


    const ALL_CRIMES = useSelector(state => state.misc || []);


useEffect(() => {
  if (!ALL_CRIMES || !query.trim()) {
    setMatches([]);
    return;
  }

  setMatches(
  ALL_CRIMES
    .filter(c => c.Offense.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.Offense.localeCompare(b.Offense)) // Adds alphabetical order
    .slice(0, 8)
);

  setActiveIndex(-1);
}, [query, ALL_CRIMES]);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setMatches([]);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

const goToCrime = (crime) => {
  navigate(`/crimes/${crime.id}`);
};

// make a fucking destination route

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
    if (e.key === 'ArrowUp') setActiveIndex((i) => Math.max(i - 1, 0));
if (e.key === 'Enter' && activeIndex >= 0) {
  goToCrime(matches[activeIndex]);
}
    if (e.key === 'Escape') setMatches([]);
  };

    if (!loaded) {
    return <p>wait a bloody minute...</p>;
  }
const slugify = (name) => name.id;
  return (
    <div className="crimeSearchWrapper" ref={wrapperRef}>
      <input
        className="crimeSearchInput"
        placeholder="Search for a crime…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {matches.length > 0 && (
        <ul className="crimeSearchResults">
        {matches.map((crime, i) => (
  <li
    key={crime.id}
    className={i === activeIndex ? 'crimeSearchResultActive' : ''}
    onMouseDown={() => goToCrime(crime)}
  >
    {crime.Offense}
  </li>
))}
        </ul>
      )}
    </div>
  );
}

export default CrimeSearch;
