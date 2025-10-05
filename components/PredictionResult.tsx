import React from 'react';
import { PredictionData, Classification } from '../types';
import { downloadPredictionAsCSV } from '../utils';

interface PredictionResultProps {
  data: PredictionData;
}

const getClassificationClasses = (classification: Classification) => {
  switch (classification) {
    case Classification.Confirmed:
      return 'bg-green-500/20 text-green-300 border-green-500';
    case Classification.Candidate:
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
    case Classification.FalsePositive:
      return 'bg-red-500/20 text-red-300 border-red-500';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500';
  }
};

const PredictionResult: React.FC<PredictionResultProps> = ({ data }) => {
  const { prediction } = data;
  const confidence = prediction.confidence ?? 0;
  const classificationClasses = getClassificationClasses(prediction.classification);
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="bg-space-blue rounded-lg p-6 border border-gray-700 shadow-lg animate-fade-in">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold font-orbitron mb-4 text-white">AI Prediction Analysis</h3>
        <button 
            onClick={() => downloadPredictionAsCSV(data)}
            className="flex items-center gap-2 text-sm bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 font-semibold py-2 px-3 rounded-md transition-colors"
            aria-label="Download prediction results as CSV"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        <div className="md:col-span-1 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                        className="text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className="text-accent-cyan"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                </svg>
                 <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{confidence}<span className="text-xl">%</span></span>
                    <span className="text-xs text-gray-400">Confidence</span>
                </div>
            </div>
        </div>
        <div className="md:col-span-2">
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Classification:</p>
            <span className={`px-4 py-1.5 text-base font-semibold rounded-full border ${classificationClasses}`}>
              {prediction.classification}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">AI Justification:</p>
            <p className="text-gray-300 bg-space-dark/50 p-3 rounded-md border border-gray-600 italic">
              {prediction.justification}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;