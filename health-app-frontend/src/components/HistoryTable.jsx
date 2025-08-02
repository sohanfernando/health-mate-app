import React from 'react';

const HistoryTable = ({ records }) => {
  if (!records || records.length === 0) {
    return <div className="text-gray-400">No records found.</div>;
  }

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
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
              <th className="px-4 py-2">TDEE</th>
              <th className="px-4 py-2">IBW (kg)</th>
              <th className="px-4 py-2">Body Fat %</th>
              <th className="px-4 py-2">Water (L)</th>
              <th className="px-4 py-2">Activity</th>
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
                <td className="px-4 py-2">{rec.tdee?.toFixed(0)}</td>
                <td className="px-4 py-2">{rec.idealBodyWeight?.toFixed(1)}</td>
                <td className="px-4 py-2">{rec.bodyFatPercentage ? `${rec.bodyFatPercentage.toFixed(1)}%` : 'N/A'}</td>
                <td className="px-4 py-2">{rec.waterIntakeLiters?.toFixed(1)}</td>
                <td className="px-4 py-2 text-xs capitalize">{rec.activityLevel?.replace('_', ' ') || '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {records.map((rec, idx) => (
          <div key={rec.id || idx} className="bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-800">
            {/* Header with Date */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-blue-300">
                {rec.date || 'No Date'}
              </h3>
              <span className="text-sm text-gray-400 capitalize">
                {rec.activityLevel?.replace('_', ' ') || '--'}
              </span>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <span className="text-gray-400 text-sm">Age</span>
                <p className="text-white font-medium">{rec.age}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Gender</span>
                <p className="text-white font-medium capitalize">{rec.gender}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Height</span>
                <p className="text-white font-medium">{rec.height} cm</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Weight</span>
                <p className="text-white font-medium">{rec.weight} kg</p>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <span className="text-gray-400 text-sm">BMI</span>
                <p className="text-blue-300 font-bold text-lg">{rec.bmi?.toFixed(1)}</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <span className="text-gray-400 text-sm">BMR</span>
                <p className="text-green-300 font-bold text-lg">{rec.bmr?.toFixed(0)} kcal</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <span className="text-gray-400 text-sm">TDEE</span>
                <p className="text-yellow-300 font-bold text-lg">{rec.tdee?.toFixed(0)} kcal</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <span className="text-gray-400 text-sm">Ideal Weight</span>
                <p className="text-purple-300 font-bold text-lg">{rec.idealBodyWeight?.toFixed(1)} kg</p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400 text-sm">Body Fat %</span>
                <p className="text-white font-medium">
                  {rec.bodyFatPercentage ? `${rec.bodyFatPercentage.toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Water Intake</span>
                <p className="text-cyan-300 font-medium">{rec.waterIntakeLiters?.toFixed(1)} L/day</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTable;