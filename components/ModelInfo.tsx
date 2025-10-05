import React, { useState } from 'react';

const HyperparameterSlider: React.FC<{ label: string, value: number, onChange: (val: number) => void, min: number, max: number, step: number }> = 
({ label, value, onChange, min, max, step }) => (
  <div>
    <label className="flex justify-between text-sm font-medium text-gray-400">
      <span>{label}</span>
      <span>{value}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-purple"
    />
  </div>
);

interface ModelInfoProps {
  modelName?: string;
  trainAccuracy?: number;
  testAccuracy?: number;
}

const ModelInfo: React.FC<ModelInfoProps> = ({ modelName, trainAccuracy, testAccuracy }) => {
    const [params, setParams] = useState({
        confidenceThreshold: 0.85,
        learningRate: 0.001,
        epochs: 50,
    });

    const handleParamChange = (param: keyof typeof params, value: number) => {
        setParams(prev => ({...prev, [param]: value}));
    };

    return (
      <div className="bg-space-blue rounded-lg p-6 border border-gray-700 shadow-lg">
        <h3 className="text-xl font-bold font-orbitron mb-4 text-white">Model Info</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-space-dark/50 p-3 rounded-md">
              <span className="font-semibold text-gray-300">Model Name:</span>
              <span className="text-accent-cyan font-mono">{modelName || "Unknown Model"}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark/50 p-3 rounded-md">
              <span className="font-semibold text-gray-300">Train Accuracy:</span>
              <span className="text-accent-cyan font-mono">{trainAccuracy ? trainAccuracy + "%" : "Unknown"}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark/50 p-3 rounded-md">
              <span className="font-semibold text-gray-300">Test Accuracy:</span>
              <span className="text-accent-cyan font-mono">{testAccuracy ? testAccuracy + "%" : "Unknown"}</span>
          </div>
          <div className="pt-2">
              <h4 className="font-semibold text-gray-200 mb-2">Hyperparameter Tweaking</h4>
              <div className="space-y-3">
                  <HyperparameterSlider 
                      label="Confidence Threshold" 
                      value={params.confidenceThreshold}
                      onChange={(val) => handleParamChange('confidenceThreshold', val)}
                      min={0.5} max={0.99} step={0.01}
                  />
                  <HyperparameterSlider 
                      label="Learning Rate" 
                      value={params.learningRate}
                      onChange={(val) => handleParamChange('learningRate', val)}
                      min={0.0001} max={0.01} step={0.0001}
                  />
                  <HyperparameterSlider 
                      label="Epochs" 
                      value={params.epochs}
                      onChange={(val) => handleParamChange('epochs', val)}
                      min={10} max={200} step={1}
                  />
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">*Hyperparameter adjustments are for demonstration purposes only.</p>
          </div>
        </div>
      </div>
    );
};

export default ModelInfo;
