import React, { useState } from 'react';
import  ExtendedResultsModal  from '../../MisconductModal/index.js';
import './misconductCard.css';

function MisconductCard({ misconduct }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="misconductCardMainDiv">
      <h3>{misconduct.rank} {misconduct.firstName} {misconduct.lastName}</h3>
      <h4>{misconduct.agency} {misconduct.state}</h4>

      <button className='modalOpeningMisconductCard' onClick={() => setIsModalOpen(true)}>
        click for more info
      </button>

      {isModalOpen && (
        <ExtendedResultsModal 
          misconduct={misconduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MisconductCard;
