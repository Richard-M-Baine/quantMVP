import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';
import { setSelectedJudgesStore } from "../../../store/county";

// make a thunk 
import './crimeIndividual.css';

import {fetchAllJudgesForCrimeThunk} from '../../../store/crime'

function CrimeJudgeCompare() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);


  const crime = useSelector((state) => state.crime)
 
  const judgeData = useSelector((state) => state.crime);
    useEffect(() => {
      dispatch(fetchAllJudgesForCrimeThunk(id)).then(() => setLoaded(true));
    }, [dispatch, id]);

    const crimeName = crime?.[0]?.Offense || "loading...";
      if (!loaded) {
    return <p>wait a bloody minute...</p>;
  }

  

  function DualListSelectorJudges({ title, items, onSubmit }) {
    const [availableJudges, setAvailableJudges] = useState(items);
    const [selectedJudges, setSelectedJudges] = useState([]);
    const [chosenJudges, setChosenJudges] = useState([]);
  
    const handleAvailableSelect = (e) => {
      const options = Array.from(e.target.selectedOptions, (o) =>
        JSON.parse(o.value)
      );
      setChosenJudges(options);
    };
  
    const moveRightJudges = () => {
      const toMove = availableJudges.filter((item) =>
        chosenJudges.some((c) => c.id === item.id)
      );
      setAvailableJudges(availableJudges.filter((item) =>
        !chosenJudges.some((c) => c.id === item.id)
      ));
      setSelectedJudges([...selectedJudges, ...toMove]);
      setChosenJudges([]);
    };
  
    const moveLeftJudges = () => {
      const toMove = selectedJudges.filter((item) =>
        chosenJudges.some((c) => c.id === item.id)
      );
      setSelectedJudges(selectedJudges.filter((item) =>
        !chosenJudges.some((c) => c.id === item.id)
      ));
      setAvailableJudges([...availableJudges, ...toMove]);
      setChosenJudges([]);
    };
  
    return (
      <div className="dual-list">
        <h3>{title}</h3>
        <div className="lists">
          <select multiple size={10} onChange={handleAvailableSelect}>
            {availableJudges.map((item, i) => (
              <option key={i} value={JSON.stringify(item)}>
                {item.Judge} - {item.County}
              </option>
            ))}
          </select>
  
          <div className="buttons">
            <button onClick={moveRightJudges}>{">"}</button>
            <button onClick={moveLeftJudges}>{"<"}</button>
          </div>
  
          <select multiple size={10} onChange={handleAvailableSelect}>
            {selectedJudges.map((item, i) => (
              <option key={i} value={JSON.stringify(item)}>
                {item.Judge}
              </option>
            ))}
          </select>
        </div>
  
        <button onClick={() => onSubmit(selectedJudges)}>
  Submit
</button>
      </div>
    );
  }

   const handleJudgeSubmit = (selectedJudges) => {
      dispatch(setSelectedJudgesStore(selectedJudges));
      navigate("/judges/compare/selection");
    };
 
  return (

    loaded && (
    <div className="crimeJudgeCompareMainHeader">
      <h2 className="crimeJudgeCompareHeader">Select the judges you wish to compare</h2>

 <DualListSelectorJudges
          title={`Judges who sentenced people in NJ for ${crimeName}`}
          items={judgeData}
          onSubmit={handleJudgeSubmit}
        />

    </div>
  ));
}

export default CrimeJudgeCompare;
