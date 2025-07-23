import React from 'react';

const ResultCard = ({ record }) => {
  if (!record) return null;
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">BMI</div>
          <div className="text-2xl font-bold text-blue-300">{record.bmi?.toFixed(1)}</div>
        </div>
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">BMR</div>
          <div className="text-2xl font-bold text-blue-300">{record.bmr?.toFixed(0)} kcal</div>
        </div>
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">Calories Needed</div>
          <div className="text-2xl font-bold text-blue-300">{record.calorieNeeds?.toFixed(0)} kcal</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">Age</div>
          <div className="text-lg text-gray-200">{record.age}</div>
        </div>
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">Gender</div>
          <div className="text-lg text-gray-200 capitalize">{record.gender}</div>
        </div>
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">Height</div>
          <div className="text-lg text-gray-200">{record.height} cm</div>
        </div>
        <div className="flex-1 min-w-[120px]">
          <div className="text-gray-400 text-sm">Weight</div>
          <div className="text-lg text-gray-200">{record.weight} kg</div>
        </div>
      </div>
      {record.date && (
        <div className="mt-4 text-gray-500 text-xs">Date: {record.date}</div>
      )}
    </div>
  );
};

export default ResultCard;
