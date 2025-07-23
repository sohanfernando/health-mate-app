import React, { useState } from 'react';
import axios from 'axios';

const CalculatorForm = ({ onResult }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/health-records', {
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onResult && onResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to calculate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-300">Age</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Gender</label>
          <select
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={e => setGender(e.target.value)}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Height (cm)</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={height}
            onChange={e => setHeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Weight (kg)</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
        disabled={loading}
      >
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
    </form>
  );
};

export default CalculatorForm;
