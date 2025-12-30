import React from 'react';

function DateGroup({ date, children }) {
  return (
    <div className="date-group">
      <h4 className="date-label">{date}</h4>
      {children}
    </div>
  );
}

export default DateGroup;