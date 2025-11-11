import React from 'react';
import axios from 'axios';

const BugItem = ({ bug, onUpdate }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bugs/${bug._id}`, { status: newStatus });
      onUpdate();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this bug permanently?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bugs/${bug._id}`);
        onUpdate();
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const statusColor = {
    'open': '#ff4444',
    'in-progress': '#ffbb33',
    'resolved': '#00C851'
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{bug.title}</h3>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Reported by:</strong> {bug.reportedBy} • {new Date(bug.createdAt).toLocaleDateString()}</p>
      
      <div style={{ marginTop: '10px' }}>
        <span style={{
          background: statusColor[bug.status],
          color: 'white',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.9em'
        }}>
          {bug.status.toUpperCase()}
        </span>

        <select
          value={bug.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          style={{ marginLeft: '15px', padding: '5px' }}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <button onClick={handleDelete} style={{ marginLeft: '15px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugItem;