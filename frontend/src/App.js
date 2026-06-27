import React from 'react';
import { Route, Routes } from 'react-router-dom';




// homepage stuff
import Landing from './components/Home';



// county stuff
import CountyLanding from './components/County/CountyLanding';

import CountyIndividual from './components/County/CountyIndividual/index.js'
import CountyCompare from './components/County/CountyCompare/index.js'
import CompareCountiesSelection from './components/County/CountyCompareSelection/index.js'

// navbar stuff
import NavBar from './components/NavBar/index.js'

// misconduct stuff
import MisconductSearch from './components/Misconduct/Misconduct/index.js';
import CrimeJudgeCompare from './components/Misconduct/CrimeJudgeCompare/index.js';

// judge stuff

import CompareJudgesSelection from './components/Judges/JudgesCountyCompare/index.js'
import JudgesLanding from './components/Judges/JudgesLanding/index.js';
import JudgeCompareCrime from './components/Judges/JudgeCompareCrime/index.js'

// crime stuff

import CrimeLanding from './components/Crime/CrimeLanding/index.js'
import CrimeSearch from './components/Crime/CrimeSearch/index.js'
import CrimeIndividual from './components/Crime/CrimeIndividual/index.js'

// useless filller

import SpielComponent from './components/Spiel/Spiel/index.js'
import DonateComponent from './components/Spiel/Donate/index.js'
import DataSetsComponent from './components/Spiel/DataSets/index.js'
import ContactComponent from './components/Spiel/Contact/index.js';

function App() {







  return (
    <>

     <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/county' element={<CountyLanding/>} />
        <Route path='/county/:county' element={<CountyIndividual/>} />
        <Route path='/county/compare/:county/:crimeId' element={<CountyCompare/>} />
        <Route path='/county/compare/selection' element={<CompareCountiesSelection />} />
        <Route path='/misconduct' element={<MisconductSearch/>} />
        <Route path='/judges' element={<JudgesLanding />} />
        <Route path='/judges/:id' element={<JudgeCompareCrime />} />
        <Route path='/judges/compare/selection' element={<CompareJudgesSelection />} />
        <Route path='/crime/judge/:id' element={<CrimeJudgeCompare/>} />
        <Route path='/crimes' element={<CrimeLanding/>} />
        <Route path='/crimes/test' element={<CrimeSearch/>} />
        <Route path='/crimes/:id' element={<CrimeIndividual/>}/>

        {/* sondersteureung schisse */}
        <Route path='/spiel' element={<SpielComponent/>} />
        <Route path='/donate' element={<DonateComponent/>} />
        <Route path='/datasets' element={<DataSetsComponent/>} />
        <Route path='/contact' element={<ContactComponent/>} />
      </Routes>


    </>
  );
}

export default App;
