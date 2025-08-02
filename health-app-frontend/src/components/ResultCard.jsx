import React from 'react';

const ResultCard = ({ record }) => {
  if (!record) return null;
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
      {/* Basic Metrics */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-blue-300 mb-4">Basic Health Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-gray-400 text-sm">BMI</div>
            <div className="text-2xl font-bold text-blue-300">{record.bmi?.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">BMR</div>
            <div className="text-2xl font-bold text-blue-300">{record.bmr?.toFixed(0)} kcal</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Calories Needed</div>
            <div className="text-2xl font-bold text-blue-300">{record.calorieNeeds?.toFixed(0)} kcal</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">TDEE</div>
            <div className="text-2xl font-bold text-blue-300">{record.tdee?.toFixed(0)} kcal</div>
          </div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-blue-300 mb-4">Advanced Health Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-gray-400 text-sm">Ideal Body Weight</div>
            <div className="text-xl font-bold text-green-300">{record.idealBodyWeight?.toFixed(1)} kg</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Body Fat %</div>
            <div className="text-xl font-bold text-green-300">
              {record.bodyFatPercentage ? `${record.bodyFatPercentage.toFixed(1)}%` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Water Intake</div>
            <div className="text-xl font-bold text-cyan-300">{record.waterIntakeLiters?.toFixed(1)} L/day</div>
          </div>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-blue-300 mb-4">Macronutrient Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Protein</div>
            <div className="text-xl font-bold text-red-300">{record.proteinGrams?.toFixed(0)}g</div>
            <div className="text-xs text-gray-500">
              {record.tdee ? `${((record.proteinGrams * 4 / record.tdee) * 100).toFixed(1)}% of calories` : ''}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Fat</div>
            <div className="text-xl font-bold text-yellow-300">{record.fatGrams?.toFixed(0)}g</div>
            <div className="text-xs text-gray-500">
              {record.tdee ? `${((record.fatGrams * 9 / record.tdee) * 100).toFixed(1)}% of calories` : ''}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Carbohydrates</div>
            <div className="text-xl font-bold text-orange-300">{record.carbsGrams?.toFixed(0)}g</div>
            <div className="text-xs text-gray-500">
              {record.tdee ? `${((record.carbsGrams * 4 / record.tdee) * 100).toFixed(1)}% of calories` : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-blue-300 mb-4">Personal Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-gray-400 text-sm">Age</div>
            <div className="text-lg text-gray-200">{record.age}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Gender</div>
            <div className="text-lg text-gray-200 capitalize">{record.gender}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Height</div>
            <div className="text-lg text-gray-200">{record.height} cm</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Weight</div>
            <div className="text-lg text-gray-200">{record.weight} kg</div>
          </div>
        </div>
      </div>

      {/* Activity & Weather Info */}
      {(record.activityLevel || record.weather) && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-blue-300 mb-4">Activity & Environment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {record.activityLevel && (
              <div>
                <div className="text-gray-400 text-sm">Activity Level</div>
                <div className="text-lg text-gray-200 capitalize">
                  {record.activityLevel.replace('_', ' ')}
                </div>
              </div>
            )}
            {record.weather && (
              <div>
                <div className="text-gray-400 text-sm">Weather</div>
                <div className="text-lg text-gray-200 capitalize">{record.weather}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Body Measurements (if provided) */}
      {(record.waist || record.neck || record.hip) && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-blue-300 mb-4">Body Measurements</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {record.waist && (
              <div>
                <div className="text-gray-400 text-sm">Waist</div>
                <div className="text-lg text-gray-200">{record.waist} cm</div>
              </div>
            )}
            {record.neck && (
              <div>
                <div className="text-gray-400 text-sm">Neck</div>
                <div className="text-lg text-gray-200">{record.neck} cm</div>
              </div>
            )}
            {record.hip && (
              <div>
                <div className="text-gray-400 text-sm">Hip</div>
                <div className="text-lg text-gray-200">{record.hip} cm</div>
              </div>
            )}
          </div>
        </div>
      )}

      {record.date && (
        <div className="mt-4 text-gray-500 text-xs">Date: {record.date}</div>
      )}
    </div>
  );
};

export default ResultCard;
