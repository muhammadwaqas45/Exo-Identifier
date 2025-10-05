import React, { useState, useCallback } from 'react';
import { ExoplanetData } from '../types';

const demoInputs = [
  {
    label: "False Positive",
    data: {
      orbitalPeriod: 0.85,
      transitDuration: 0.5,
      transitDepth: 0.001,
      planetRadius: 0.5,
      equilibriumTemp: 900,
      insolation: 3000,
      modelSNR: 3,
      stellarTemp: 6200,
      stellarLogg: 4.3,
      stellarRadius: 1.1
    }
  },
  {
    label: "Candidate",
    data: {
      orbitalPeriod: 10.5,
      transitDuration: 3.2,
      transitDepth: 0.007,
      planetRadius: 1.5,
      equilibriumTemp: 550,
      insolation: 140,
      modelSNR: 10,
      stellarTemp: 5700,
      stellarLogg: 4.4,
      stellarRadius: 1.0
    }
  },
  {
    label: "Confirmed",
    data: {
      orbitalPeriod: 365.25,
      transitDuration: 13,
      transitDepth: 0.01,
      planetRadius: 1.2,
      equilibriumTemp: 500,
      insolation: 140,
      modelSNR: 12,
      stellarTemp: 5700,
      stellarLogg: 4.4,
      stellarRadius: 1.0
    }
  }
];


interface DataInputProps {
  onPredict: (data: ExoplanetData) => void;
  isLoading: boolean;
}

type InputMode = 'file' | 'manual';

const sampleData: ExoplanetData = {
  orbitalPeriod: 365.25,
  transitDuration: 13,
  transitDepth: 0.008,
  planetRadius: 1.2,
  equilibriumTemp: 500,
  insolation: 140,
  modelSNR: 10,
  stellarTemp: 5700,
  stellarLogg: 4.4,
  stellarRadius: 1.0,
};

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="group relative flex items-center">
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 border border-gray-600 shadow-lg z-10">
      {text}
    </div>
  </div>
);

const DataInput: React.FC<DataInputProps> = ({ onPredict, isLoading }) => {
  const [mode, setMode] = useState<InputMode>('manual');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [manualData, setManualData] = useState<ExoplanetData>({
    orbitalPeriod: 11.8,
    transitDuration: 3.5,
    transitDepth: 0.01,
    planetRadius: 1.2,
    equilibriumTemp: 500,
    insolation: 140,
    modelSNR: 10,
    stellarTemp: 5700,
    stellarLogg: 4.4,
    stellarRadius: 1.0,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setManualData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = useCallback(() => {
    if (mode === 'file' && fileName) {
      onPredict({ fileName });
    } else if (mode === 'manual') {
      onPredict(manualData);
    }
  }, [mode, fileName, manualData, onPredict]);

  const handleLoadSample = () => {
    setMode('manual');
    setManualData(sampleData);
  };

  const TabButton: React.FC<{ children: React.ReactNode; targetMode: InputMode; }> = ({ children, targetMode }) => (
    <button
      onClick={() => setMode(targetMode)}
      className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg text-center
        ${mode === targetMode
          ? 'bg-accent-cyan/20 text-accent-cyan shadow'
          : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }
        transition-colors focus:outline-none focus:ring-2 ring-offset-2 ring-offset-space-blue ring-white ring-opacity-60`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-space-blue rounded-lg p-6 border border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold font-orbitron mb-4 text-white">Data Input</h3>
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/20 p-1 mb-4">
        <Tooltip text="Directly enter parameters if you know them.">
          <TabButton targetMode="manual">Manual Entry</TabButton>
        </Tooltip>
        <Tooltip text="Upload a CSV or Excel file with light curve data.">
          <TabButton targetMode="file">File Upload</TabButton>
        </Tooltip>
      </div>

      {mode === 'manual' ? (
        <div className="space-y-4">
          {/* Basic Parameters */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Orbital Period (days)</label>
            <input type="number" name="orbitalPeriod" value={manualData.orbitalPeriod || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Transit Duration (hours)</label>
            <input type="number" name="transitDuration" value={manualData.transitDuration || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Transit Depth (relative flux)</label>
            <input type="number" name="transitDepth" step="0.001" value={manualData.transitDepth || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
          </div>

          {/* Advanced Parameters Toggle */}
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-accent-cyan font-semibold hover:underline text-sm">
            {showAdvanced ? 'Hide Advanced Parameters' : 'Show Advanced Parameters'}
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Planet Radius (Earth radii)</label>
                <input type="number" name="planetRadius" value={manualData.planetRadius || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Equilibrium Temperature (K)</label>
                <input type="number" name="equilibriumTemp" value={manualData.equilibriumTemp || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Insolation (W/m²)</label>
                <input type="number" name="insolation" value={manualData.insolation || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Model SNR</label>
                <input type="number" name="modelSNR" value={manualData.modelSNR || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Stellar Temperature (K)</label>
                <input type="number" name="stellarTemp" value={manualData.stellarTemp || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Stellar Log g (cm/s²)</label>
                <input type="number" name="stellarLogg" value={manualData.stellarLogg || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Stellar Radius (Solar radii)</label>
                <input type="number" name="stellarRadius" value={manualData.stellarRadius || ''} onChange={handleManualChange} className="w-full bg-space-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-accent-cyan focus:border-accent-cyan transition"/>
              </div>
            </div>
          )}

          <div className="text-center text-sm pt-2">
            <span className="text-gray-400">Don't have data? </span>
            <button onClick={handleLoadSample} className="text-accent-cyan hover:underline font-semibold">
              Try an example
            </button>
            <div className="mt-4">
  <p className="text-gray-400 text-sm mb-2 text-center">Or try a demo input:</p>
  <div className="flex justify-center gap-3 flex-wrap">
    {demoInputs.map((demo, idx) => (
      <button
        key={idx}
        onClick={() => setManualData(demo.data)}
        className="bg-accent-cyan hover:bg-cyan-500 text-black font-semibold px-4 py-2 rounded-full shadow-sm transition-all duration-200 transform hover:scale-105"
      >
        {demo.label}
      </button>
    ))}
  </div>
</div>

          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="file-upload" className="relative cursor-pointer bg-space-dark rounded-md font-medium text-accent-cyan hover:text-cyan-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent-cyan">
            <div className="flex justify-center items-center px-6 py-10 border-2 border-gray-600 border-dashed rounded-md hover:border-accent-cyan transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-gray-400">
                  {fileName ? fileName : "Upload CSV or Excel file"}
                </p>
              </div>
            </div>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
          </label>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading || (mode === 'file' && !fileName)}
        className="mt-6 w-full bg-accent-purple hover:bg-purple-600 text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? 'Processing...' : 'Run AI Prediction'}
      </button>
    </div>
  );
};

export default DataInput;
