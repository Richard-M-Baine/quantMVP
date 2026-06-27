import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./countyCompareSelection.css";

function CompareCountiesSelection() {
  const navigate = useNavigate();
  const selectedCountiesStore = useSelector(
    (state) => state.county.selectedCountiesStore || []
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const [sortKey, setSortKey] = useState(null); // which column
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" | "desc"

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/county");
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      // toggle order if same key is clicked again
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // new key resets to descending by default
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  // sort the data
  const sortedCounties = [...selectedCountiesStore].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = Number(a[sortKey]) || 0;
    const valB = Number(b[sortKey]) || 0;

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  return (
    <div className="compare-containerSelectionasdf">
      <div className="compareCountiesHeaderDiv">
        <h2>Comparing The Counties Selected</h2>
        <button className="btn btn-secondary" onClick={handleGoBack}>Go Back</button>
        <button className="btn btn-primary" onClick={handleToggleExpand}>
          {isExpanded ? "Collapse Data" : "Expand Data"}
        </button>
      </div>

      <div className="compareCountiesSortDiv">
        <h3>Sort by</h3>
        <button 
          className={`sort-btn ${sortKey === "AverageIncarcerationLength" ? "active" : ""}`}
          onClick={() => handleSort("AverageIncarcerationLength")}
        >
          Average Incarceration Length {sortKey === "AverageIncarcerationLength" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button 
          className={`sort-btn ${sortKey === "AverageProbation" ? "active" : ""}`}
          onClick={() => handleSort("AverageProbation")}
        >
          Average Probation Length {sortKey === "AverageProbation" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button 
          className={`sort-btn ${sortKey === "TotalCasesYear" ? "active" : ""}`}
          onClick={() => handleSort("TotalCasesYear")}
        >
          Total Cases {sortKey === "TotalCasesYear" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        
      </div>

      {selectedCountiesStore.length === 0 ? (
        <p>No counties selected yet.</p>
      ) : (
        <div className="counties-gridCompareasdf">
          {sortedCounties.map((c, i) => (
            <div key={i} className="county-cardCompareasdf">
              <h3>{c.County}</h3>
              <p>
                <strong>Offense:</strong> {c.Offense}
              </p>
              {isExpanded ? (
                <>
                  <p><strong>County:</strong> {c.County}</p>
                  <p><strong>Offense:</strong> {c.Offense}</p>
                  <p><strong>Average Incarceration Length:</strong> {c.AverageIncarcerationLength}</p>
                  <p><strong>Total Cases (Year):</strong> {c.TotalCasesYear}</p>
                  <p><strong>Max Sentence:</strong> {c.MaxSentence}</p>
                  <p><strong>Min Sentence:</strong> {c.MinSentence}</p>
                  <p><strong>Std Dev Sentence:</strong> {c.StdDevSentence}</p>
                  <p><strong>Median Sentence:</strong> {c.MedianSentence}</p>
                  <p><strong>Mode Sentence:</strong> {c.ModeSentence}</p>
                  <p><strong>Average Probation:</strong> {c.AverageProbation}</p>
                  <p><strong>Total Probation Instances:</strong> {c.TotalProbationInstances}</p>
                  <p><strong>Total Probation Month Sum:</strong> {c.TotalProbationMonthSum}</p>
                  <p><strong>Max Probation:</strong> {c.MaxProbation}</p>
                  <p><strong>Min Probation:</strong> {c.MinProbation}</p>
                  <p><strong>Std Dev Probation:</strong> {c.StdDevProbation}</p>
                  <p><strong>Median Probation:</strong> {c.MedianProbation}</p>
                  <p><strong>Mode Probation:</strong> {c.ModeProbation}</p>
                </>
              ) : (
                <>
                  <p><strong>Avg Incarceration:</strong> {c.AverageIncarcerationLength}</p>
                  <p><strong>Total Cases:</strong> {c.TotalCasesYear}</p>
                  <p><strong>Avg Probation:</strong> {c.AverageProbation}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompareCountiesSelection;