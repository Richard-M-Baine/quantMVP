import React from 'react';

const ExtendedResults = ({ onClose, misconduct }) => {
  return (
    <div className="misconductModal">

      <div className="misconductModalHeader">
        <h2 className="misconductModalTitle">Misconduct Details</h2>
      </div>

      <div className="misconductModalBody">
        <div className="misconductModalGrid">
          {Object.entries(misconduct).map(([key, value], i, arr) => {
            const isLastRow = i >= arr.length - (arr.length % 2 === 0 ? 2 : 1);
            const isRightCol = i % 2 === 1;
            return (
              <div
                key={key}
                className={[
                  'misconductModalCell',
                  isLastRow   ? 'misconductModalCellLastRow' : '',
                  isRightCol  ? 'misconductModalCellRight'   : '',
                ].join(' ').trim()}
              >
                <p className="misconductModalLabel">{key}</p>
                <p className="misconductModalValue">{value || 'N/A'}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="misconductModalFooter">
        <button
  className="misconductModalCloseBtn"
  onClick={onClose}
>
  Close
</button>
      </div>

    </div>
  );
};

export default ExtendedResults;
