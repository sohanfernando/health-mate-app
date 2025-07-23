import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryTable from '../components/HistoryTable';

const HistoryPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:8080/health-records', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecords(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Your Health History</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <HistoryTable records={records} />
      )}
    </div>
  );
};

export default HistoryPage;
