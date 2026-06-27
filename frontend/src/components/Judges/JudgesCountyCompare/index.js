import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./judgesCountyCompare.css";

function CompareJudgesSelection() {
  const navigate = useNavigate();
  const selectedJudgeStore = useSelector(
    (state) => state.county.selectedJudgesStore || []
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortKey, setSortKey] = useState(null); // which column
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" | "desc"

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/judge"); // Adjusted to navigate to judge-related page
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
  const sortedJudges = [...selectedJudgeStore].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = Number(a[sortKey]) || 0;
    const valB = Number(b[sortKey]) || 0;

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  return (
    <div className="compare-containerSelectionasdf">
      <div className="compareCountiesHeaderDiv">
        <h2>Comparing The Judges Selected</h2>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          Go Back
        </button>
        <button className="btn btn-primary" onClick={handleToggleExpand}>
          {isExpanded ? "Collapse Data" : "Expand Data"}
        </button>
      </div>

      <div className="compareCountiesSortDiv">
        <h3>Sort by</h3>
        <button
          className={`sort-btn ${
            sortKey === "AverageIncarcerationYear" ? "active" : ""
          }`}
          onClick={() => handleSort("AverageIncarcerationYear")}
        >
          Average Incarceration Length{" "}
          {sortKey === "AverageIncarcerationYear"
            ? sortOrder === "asc"
              ? "↑"
              : "↓"
            : ""}
        </button>
        <button
          className={`sort-btn ${sortKey === "AverageProbationMonth" ? "active" : ""}`}
          onClick={() => handleSort("AverageProbationMonth")}
        >
          Average Probation Length{" "}
          {sortKey === "AverageProbationMonth" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button
          className={`sort-btn ${sortKey === "TotalCasesYear" ? "active" : ""}`}
          onClick={() => handleSort("TotalCasesYear")}
        >
          Total Cases {sortKey === "TotalCasesYear" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
      </div>

      {selectedJudgeStore.length === 0 ? (
        <p>No judges selected yet.</p>
      ) : (
        <div className="counties-gridCompareasdf">
          {sortedJudges.map((j, i) => (
            <div key={i} className="county-cardCompareasdf">
              <h3>{j.Judge}</h3> {/* Changed from County to Judge */}
              <p>
                <strong>Offense:</strong> {j.Offense}
              </p>
              {isExpanded ? (
                <>
                  <p>
                    <strong>Judge:</strong> {j.Judge}
                  </p> {/* Changed from County to Judge */}
                  <p>
                    <strong>Offense:</strong> {j.Offense}
                  </p>
                  <p>
                    <strong>Average Incarceration Length:</strong>{" "}
                    {j.AverageIncarcerationYear}
                  </p>
                  <p>
                    <strong>Total Cases (Year):</strong> {j.TotalCasesYear}
                  </p>
                  <p>
                    <strong>Max Sentence:</strong> {j.MaxSentenceYear}
                  </p>
                  <p>
                    <strong>Min Sentence:</strong> {j.MinSentenceYear}
                  </p>
                  <p>
                    <strong>Std Dev Sentence:</strong> {j.StdDevSentenceYear}
                  </p>
                  <p>
                    <strong>Median Sentence:</strong> {j.MedianSentenceYear}
                  </p>
                  <p>
                    <strong>Mode Sentence:</strong> {j.ModeSentenceYear}
                  </p>
                  <p>
                    <strong>Average Probation:</strong> {j.AverageProbationMonth}
                  </p>
                  <p>
                    <strong>Total Probation Instances:</strong>{" "}
                    {j.TotalProbationMonthInstances}
                  </p>
               
                  <p>
                    <strong>Max Probation:</strong> {j.MaxProbationMonth}
                  </p>
                  <p>
                    <strong>Min Probation:</strong> {j.MinProbationMonth}
                  </p>
                  <p>
                    <strong>Std Dev Probation:</strong> {j.StdDevProbationMonth}
                  </p>
                  <p>
                    <strong>Median Probation:</strong> {j.MedianProbationMonth}
                  </p>
                  <p>
                    <strong>Mode Probation:</strong> {j.ModeProbationMonth}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Avg Incarceration:</strong>{" "}
                    {j.AverageIncarcerationYear}
                  </p>
                  <p>
                    <strong>Total Cases:</strong> {j.TotalCasesYear}
                  </p>
                  <p>
                    <strong>Avg Probation:</strong> {j.AverageProbationMonth}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompareJudgesSelection;