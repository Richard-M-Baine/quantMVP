import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


import { fetchCountyCrimeDataThunk } from "../../../store/county";

import { setSelectedCountiesStore, setSelectedJudgesStore } from "../../../store/county";
import "./countyCompare.css";

function DualListSelector({ title, items, onSubmit }) {
  const [available, setAvailable] = useState(items);
  const [selected, setSelected] = useState([]);
  const [chosen, setChosen] = useState([]);

  // Track what’s selected in each box
  const handleAvailableSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, (o) =>
      JSON.parse(o.value)
    );
    setChosen(options);
  };

  const moveRight = () => {
    const toMove = available.filter((item) =>
      chosen.some((c) => c.id === item.id)
    );
    setAvailable(available.filter((item) =>
      !chosen.some((c) => c.id === item.id)
    ));
    setSelected([...selected, ...toMove]);
    setChosen([]);
  };

  const moveLeft = () => {
    const toMove = selected.filter((item) =>
      chosen.some((c) => c.id === item.id)
    );
    setSelected(selected.filter((item) =>
      !chosen.some((c) => c.id === item.id)
    ));
    setAvailable([...available, ...toMove]);
    setChosen([]);
  };

  return (
    <div className="dual-list">
      <h3>{title}</h3>
      <div className="lists">
        <select multiple size={10} onChange={handleAvailableSelect}>
          {available.map((item, i) => (
            <option key={i} value={JSON.stringify(item)}>
              {item.County} {/* Display name */}
            </option>
          ))}
        </select>

        <div className="buttons">
          <button onClick={moveRight}>{">"}</button>
          <button onClick={moveLeft}>{"<"}</button>
        </div>

        <select multiple size={10} onChange={handleAvailableSelect}>
          {selected.map((item, i) => (
            <option key={i} value={JSON.stringify(item)}>
              {item.County}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => onSubmit(selected)}>Submit</button>
    </div>
  );
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
              {item.Judge} {/* Display name */}
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

      <button onClick={() => onSubmit(selectedJudges)}>Submit</button>
    </div>
  );
}




export default function CountyCompare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { county, crimeId } = useParams();

  const countyData = useSelector((state) => state.county.countyCrimes || []);
  const judgeData = useSelector((state) => state.county.judgeCrimes || []);
  const judgeCountyFind = useSelector((state) => state.judge || [])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchCountyCrimeDataThunk(county, crimeId));
      setLoaded(true);
    }
    fetchData();
  }, [county, crimeId, dispatch]);

  const handleCountySubmit = (selected) => {
    dispatch(setSelectedCountiesStore(selected));
    navigate("/county/compare/selection");
  };

  const handleJudgeSubmit = (selectedJudges) => {
    dispatch(setSelectedJudgesStore(selectedJudges));
    navigate("/judges/compare/selection");
  };

  return (
    loaded && (
      <div className="county-compare-page">
        <div className="offense-header-county-compare">
          <h1>Compare counties in New Jersey and individual judges in {judgeCountyFind[0].County}  who have sentenced individuals for </h1>

          <h1>{judgeData[0].Offense}</h1>
        </div>
        <DualListSelector
          title="Counties"
          items={countyData} // full objects, not just abbrevs
          onSubmit={handleCountySubmit}
        />

        <DualListSelectorJudges
          title={`Judges in ${judgeCountyFind[0].County}`}
          items={judgeData}
          onSubmit={handleJudgeSubmit}
        />
      </div>
    )
  );
}
