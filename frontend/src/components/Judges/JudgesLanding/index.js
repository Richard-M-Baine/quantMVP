import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchJudgeSearchThunk } from '../../../store/judge'
import { fetchJudgeLandingCrimeThunk } from '../../../store/total'

import './JudgesLanding.css'

function JudgesLanding () {
  const countiesObject = {
    atlantic: {
      id: 1,
      name: 'Atlantic'
    },
    bergen: {
      id: 2,
      name: 'Bergen'
    },
    burlington: {
      id: 3,
      name: 'Burlington'
    },
    camden: {
      id: 4,
      name: 'Camden'
    },
    cape_may: {
      id: 5,
      name: 'Cape May'
    },
    cumberland: {
      id: 6,
      name: 'Cumberland'
    },
    essex: {
      id: 7,
      name: 'Essex'
    },
    gloucester: {
      id: 8,
      name: 'Gloucester'
    },
    hudson: {
      id: 9,
      name: 'Hudson'
    },
    hunterdon: {
      id: 10,
      name: 'Hunterdon'
    },
    mercer: {
      id: 11,
      name: 'Mercer'
    },
    middlesex: {
      id: 12,
      name: 'Middlesex'
    },
    monmouth: {
      id: 13,
      name: 'Monmouth'
    },
    morris: {
      id: 14,
      name: 'Morris'
    },
    ocean: {
      id: 15,
      name: 'Ocean'
    },
    passaic: {
      id: 16,
      name: 'Passaic'
    },
    salem: {
      id: 17,
      name: 'Salem'
    },
    somerset: {
      id: 18,
      name: 'Somerset'
    },
    sussex: {
      id: 19,
      name: 'Sussex'
    },
    union: {
      id: 20,
      name: 'Union'
    },
    warren: {
      id: 21,
      name: 'Warren'
    }
  }
  const dispatch = useDispatch()
  const judgeList = useSelector(state => state?.judge[0])
  const crimeList = useSelector(state => state?.total)

  const [lastName, setLastName] = useState('')
  const [county, setCounty] = useState('')
  const [offense, setOffense] = useState('')
  const [searched, setSearched] = useState(false)
  const [searchType, setSearchType] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()

    await dispatch(fetchJudgeSearchThunk( lastName, county ))
    setSearched(true)
    setSearchType('judges')
  }

  const handleOffenseSubmit = async e => {
    e.preventDefault()
    await dispatch(fetchJudgeLandingCrimeThunk({ offense }))
    setSearched(true)
    setSearchType('crimes')
  }

  const handleClear = () => {
    setLastName('')
    setCounty('')
    setOffense('')
    setSearched(false)
  }

  return (
    <div className='mainJudgesLanding'>
      <h1 className='judgesLanding__heading'>Search judges or crimes</h1>
      <p className='judgesLanding__subheading'>
        Search by judge name and / or county, or look up a charge to compare
        sentencing across NJ
      </p>

      <div className='judgesLanding__formGrid'>
        {/* Judge search */}
        <div className='judgesLanding__panel'>
          <p className='judgesLanding__panelLabel'>Judge search</p>
          <form onSubmit={handleSubmit}>
            <div className='judgesLanding__field'>
              <label>Name</label>
              <input
                type='text'
                placeholder='Last or first name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className='judgesLanding__field'>
              <label>County</label>
              <select value={county}
               onChange={e => setCounty(e.target.value)}
               className='judgeLandingCountyDropdown'
               >
                <option  value=''>All Counties</option>
                {Object.values(countiesObject).map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit' className='judgesLanding__submitBtn'>
              Search judges
            </button>
          </form>
        </div>

        {/* Crime search */}
        <div className='judgesLanding__panel'>
          <p className='judgesLanding__panelLabel'>Crime search</p>
          <form onSubmit={handleOffenseSubmit}>
            <div className='judgesLanding__field'>
              <label>Charge or offense</label>
              <input
                type='text'
                placeholder='e.g. Aggravated Assault'
                value={offense}
                onChange={e => setOffense(e.target.value)}
              />
            </div>
            <p className='judgesLanding__panelHint'>
              Returns all judges statewide who have sentenced this charge —
              useful for side-by-side comparison.
            </p>
            <button type='submit' className='judgesLanding__submitBtn'>
              Compare sentencing
            </button>
          </form>
        </div>
      </div>

      {searched && (
        <div className='judgesLanding__results'>
          <div className='judgesLanding__resultsHeader'>
            <p className='judgesLanding__resultsLabel'>
              Results — {searchType}
            </p>
            <button className='judgesLanding__clearBtn' onClick={handleClear}>
              Clear
            </button>
          </div>

          {searchType === 'judges' &&
            (judgeList && judgeList.length > 0 ? (
              <ul className='judgesLanding__resultList'>
                {judgeList.map((judge, idx) => (
                  <li key={idx}>
                    <Link to={`/judges/${judge.id}`}>
                      <span>{judge.Judge}</span>
                      <span className='judgesLanding__resultMeta'>
                        {judge.County}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='judgesLanding__empty'>No judges found.</p>
            ))}

          {searchType === 'crimes' &&
            (crimeList && crimeList.length > 0 ? (
              <ul className='judgesLanding__resultList'>
                {crimeList.map((crime, idx) => (
                  <li key={idx}>
                    <Link to={`/crime/judge/${crime.id}`}>
                      <span>{crime.Offense}</span>
                      <span className='judgesLanding__resultMeta'>
                        Compare sentencing →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Apparently there is no judge by that name.  Try a new name or some other variation of your wording. </p>
            ))}
        </div>
      )}
    </div>
  )
}

export default JudgesLanding
