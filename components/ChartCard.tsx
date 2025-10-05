
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-space-blue rounded-lg p-4 border border-gray-700 shadow-lg">
      <h4 className="font-semibold text-lg text-gray-200 mb-4">{title}</h4>
      <div className="text-xs text-gray-400">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
