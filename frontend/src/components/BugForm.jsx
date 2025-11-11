import React, { useState } from 'react';
import axios from 'axios';

const BugForm = ({ onBugAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reportedBy: ''
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bugs', formData);
      setFormData({ title: '', description: '', reportedBy: '' });
      setSuccess(true);
      setErrors([]);
      onBugAdded();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(['Something went wrong. Please try again.']);
      }
    }
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Report New Bug</h2>
      {success && <p style={{ color: 'green' }}>Bug reported successfully!</p>}
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Bug title (min 3 chars)"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <textarea
          name="description"
          placeholder="Describe the bug..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          type="text"
          name="reportedBy"
          placeholder="Your name"
          value={formData.reportedBy}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#0066cc', color: 'white', border: 'none' }}>
          Report Bug
        </button>
      </form>
    </div>
  );
};

export default BugForm;