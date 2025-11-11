import React from 'react';
import BugItem from './BugItem';

const BugList = ({ bugs, onUpdate }) => {
  if (bugs.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No bugs reported yet. Be the first!</p>;
  }

  return (
    <div>
      <h2>All Reported Bugs ({bugs.length})</h2>
      {bugs.map(bug => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default BugList;