import React from 'react';

const HistoryTable = ({ records }) => {
  if (!records || records.length === 0) {
    return <div className="text-gray-400">No records found.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-gray-900 text-gray-100">
        <thead>
          <tr className="bg-gray-800 text-blue-300">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Height (cm)</th>
            <th className="px-4 py-2">Weight (kg)</th>
            <th className="px-4 py-2">BMI</th>
            <th className="px-4 py-2">BMR</th>
            <th className="px-4 py-2">Calories</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, idx) => (
            <tr key={rec.id || idx} className="border-b border-gray-800 hover:bg-gray-800 transition">
              <td className="px-4 py-2 text-xs text-gray-400">{rec.date || '--'}</td>
              <td className="px-4 py-2">{rec.age}</td>
              <td className="px-4 py-2 capitalize">{rec.gender}</td>
              <td className="px-4 py-2">{rec.height}</td>
              <td className="px-4 py-2">{rec.weight}</td>
              <td className="px-4 py-2">{rec.bmi?.toFixed(1)}</td>
              <td className="px-4 py-2">{rec.bmr?.toFixed(0)}</td>
              <td className="px-4 py-2">{rec.calorieNeeds?.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
