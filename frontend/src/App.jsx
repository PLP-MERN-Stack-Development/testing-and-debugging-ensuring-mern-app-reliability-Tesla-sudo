import React, { useState, useEffect } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import axios from 'axios';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/bugs');
      setBugs(res.data);
    } catch (err) {
      alert('Failed to load bugs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <ErrorBoundary>
      <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Bug Tracker</h1>
        <BugForm onBugAdded={fetchBugs} />
        <hr />
        {loading ? <p>Loading bugs...</p> : <BugList bugs={bugs} onUpdate={fetchBugs} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;