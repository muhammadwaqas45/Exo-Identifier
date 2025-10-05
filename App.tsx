 import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataInput from './components/DataInput';
import PredictionResult from './components/PredictionResult';
import Visualizations from './components/Visualizations';
import ModelInfo from './components/ModelInfo';
import SolarSystemView from './components/SolarSystemView';
import { ExoplanetData, PredictionData } from './types';
import { predictExoplanet } from './services/geminiService';

type View = 'dashboard' | 'analysis';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [prediction, setPrediction] = useState<PredictionData & { modelName?: string; trainAccuracy?: number; testAccuracy?: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [show3DView, setShow3DView] = useState<boolean>(false);

  const handleAnalysisRequest = useCallback(async (data: ExoplanetData) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setView('analysis');

    try {
      // Send all required numeric features to backend
      const features = {
        koi_period: data.orbitalPeriod,
        koi_duration: data.transitDuration,
        koi_depth: data.transitDepth,
        koi_prad: data.planetRadius || 1.2,
        koi_teq: data.equilibriumTemp || 500,
        koi_insol: data.insolation || 140,
        koi_model_snr: data.modelSNR || 10,
        koi_steff: data.stellarTemp || 5700,
        koi_slogg: data.stellarLogg || 4.4,
        koi_srad: data.stellarRadius || 1.0
      };

      const result = await predictExoplanet({ features });
      setPrediction(result);
    } catch (e) {
      console.error(e);
      setError('Failed to get a prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBackToDashboard = () => {
    setView('dashboard');
    setPrediction(null);
    setError(null);
  };

  const renderContent = () => {
    if (view === 'dashboard') {
      return <Dashboard onAnalyzeClick={() => setView('analysis')} />;
    }

    return (
      <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <DataInput onPredict={handleAnalysisRequest} isLoading={isLoading} />
          <ModelInfo
            modelName={prediction?.modelName || "Exoplanet Model 90+"}
            trainAccuracy={prediction?.trainAccuracy || 99}
            testAccuracy={prediction?.testAccuracy || 95}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full bg-space-blue rounded-lg p-8 border border-gray-700">
              <svg className="animate-spin h-12 w-12 text-accent-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-lg text-gray-300 font-semibold">Analyzing cosmic signatures...</p>
              <p className="text-sm text-gray-400">Our AI is crunching the numbers.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Error Communicating with AI Core</h3>
              <p>{error}</p>
            </div>
          )}

          {prediction && (
            <>
              <PredictionResult data={prediction} />
              {prediction.visualizations ? (
                <Visualizations data={prediction.visualizations} />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 border border-gray-700 rounded-md p-6">
                  <p className="text-sm">No visualization data available yet.</p>
                </div>
              )}
              <div className="text-center">
                <button 
                  onClick={() => setShow3DView(true)}
                  className="bg-accent-cyan/20 hover:bg-accent-cyan/40 text-accent-cyan font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-cyan/20 border border-accent-cyan/50"
                >
                  🔭 View in 3D
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-space-dark">
      <Header onLogoClick={handleBackToDashboard} />
      <main>{renderContent()}</main>
      {show3DView && prediction && <SolarSystemView data={prediction} onClose={() => setShow3DView(false)} />}
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; 2024 AI Exoplanet Identifier. For educational and demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
