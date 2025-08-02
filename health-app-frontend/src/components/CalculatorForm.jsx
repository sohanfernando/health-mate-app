import React, { useState } from 'react';
import axios from 'axios';

const CalculatorForm = ({ onResult }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderately_active');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [weather, setWeather] = useState('moderate');
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
        activityLevel,
        waist: waist ? Number(waist) : null,
        neck: neck ? Number(neck) : null,
        hip: hip ? Number(hip) : null,
        weather,
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
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
      {/* Basic Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Activity Level */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-4">Activity Level</h3>
        <div>
          <label className="block mb-1 text-gray-300">Daily Activity</label>
          <select
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={activityLevel}
            onChange={e => setActivityLevel(e.target.value)}
            required
          >
            <option value="sedentary">Sedentary (Little or no exercise)</option>
            <option value="lightly_active">Lightly Active (Light exercise 1-3 days/week)</option>
            <option value="moderately_active">Moderately Active (Moderate exercise 3-5 days/week)</option>
            <option value="very_active">Very Active (Hard exercise 6-7 days/week)</option>
            <option value="extremely_active">Extremely Active (Very hard exercise, physical job)</option>
          </select>
        </div>
      </div>

      {/* Body Measurements (Optional for Body Fat %) */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-4">Body Measurements (Optional)</h3>
        <p className="text-gray-400 text-sm mb-4">Fill these to calculate body fat percentage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-gray-300">Waist (cm)</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={waist}
              onChange={e => setWaist(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Neck (cm)</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={neck}
              onChange={e => setNeck(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Hip (cm) {gender === 'female' && '*'}</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={hip}
              onChange={e => setHip(e.target.value)}
              placeholder={gender === 'female' ? "Required for women" : "Optional"}
              required={gender === 'female' && waist && neck}
            />
          </div>
        </div>
      </div>

      {/* Weather Conditions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-4">Weather Conditions</h3>
        <div>
          <label className="block mb-1 text-gray-300">Current Weather</label>
          <select
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={weather}
            onChange={e => setWeather(e.target.value)}
            required
          >
            <option value="hot">Hot (Above 30°C/86°F)</option>
            <option value="moderate">Moderate (15-30°C/59-86°F)</option>
            <option value="cold">Cold (Below 15°C/59°F)</option>
          </select>
        </div>
      </div>

      {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
        disabled={loading}
      >
        {loading ? 'Calculating...' : 'Calculate Advanced Health Metrics'}
      </button>
    </form>
  );
};

export default CalculatorForm;
