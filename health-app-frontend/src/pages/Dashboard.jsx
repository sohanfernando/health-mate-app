import React, { useEffect, useState } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import ResultCard from '../components/ResultCard';
import axios from 'axios';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/health-records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) {
        setRecords(res.data);
      } else {
        setRecords([]);
      }
    } catch (e) {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [token]);

  const latestRecord = records.length > 0 ? records[records.length - 1] : null;

  const handleNewCalculation = (newRecord) => {
    // Add the new record to the list and update the state
    setRecords(prevRecords => [...prevRecords, newRecord]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">Welcome, {user?.name || 'User'}!</h2>
        <p className="text-gray-400 mb-2">Email: <span className="text-gray-200">{user?.email}</span></p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-gray-800 rounded-lg p-4 flex-1 min-w-[180px]">
            <div className="text-gray-400 text-sm">Total Records</div>
            <div className="text-2xl font-bold text-blue-300">{records.length}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 flex-1 min-w-[180px]">
            <div className="text-gray-400 text-sm">Last BMI</div>
            <div className="text-2xl font-bold text-blue-300">{latestRecord ? latestRecord.bmi?.toFixed(1) : '--'}</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Calculate Your Health Stats</h3>
        <CalculatorForm onResult={handleNewCalculation} />
      </div>
      {latestRecord && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Latest Result</h3>
          <ResultCard record={latestRecord} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
