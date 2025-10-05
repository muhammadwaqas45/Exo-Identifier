import React from 'react';
import { NASA_MISSIONS } from '../constants';
import HowItWorks from './HowItWorks';

interface DashboardProps {
  onAnalyzeClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in space-y-16">
      <section className="text-center bg-space-blue rounded-lg p-8 md:p-12 border border-gray-700 shadow-2xl shadow-accent-cyan/10">
        <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4">Unlock the Secrets of the Cosmos</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
          This tool leverages state-of-the-art AI to analyze stellar light curve data, helping astronomers and enthusiasts identify potential exoplanets. Upload a dataset or enter parameters to begin your journey of discovery.
        </p>
        <button 
          onClick={onAnalyzeClick}
          className="bg-accent-cyan hover:bg-cyan-500 text-space-dark font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-cyan/30"
        >
          Start Analysis
        </button>
      </section>

      <HowItWorks />

      <section>
        <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-center mb-8 text-white">Pioneering Exoplanet Missions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NASA_MISSIONS.map((mission) => (
            <div key={mission.name} className="bg-space-blue rounded-lg overflow-hidden border border-gray-700 hover:border-accent-purple transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-accent-purple/20">
              <img src={mission.imageUrl} alt={mission.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-white">{mission.name}</h4>
                <p className="text-gray-400">{mission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
