import { PredictionData } from './types';

const generateCSVContent = (data: PredictionData): string => {
  const { prediction, visualizations } = data;
  
  const rows = [
    ['Parameter', 'Value'],
    ['Classification', prediction.classification],
    ['Confidence Score (%)', prediction.confidence.toString()],
    ['AI Justification', `"${prediction.justification.replace(/"/g, '""')}"`],
    ['---Visualizations---', ''],
    ['Orbital Period (days)', visualizations.orbitalPeriod.toString()],
    ['Transit Duration (hours)', visualizations.transitDuration.toString()],
    ['Planetary Radius (Earth Radii)', visualizations.planetaryRadius.toString()],
    ['Stellar Radius (Solar Radii)', visualizations.stellarRadius.toString()],
    ['',''],
    ['---Light Curve Data---', ''],
    ['Time', 'Flux'],
  ];

  visualizations.lightCurve.forEach(point => {
    rows.push([point.time.toString(), point.flux.toString()]);
  });
  
  return rows.map(e => e.join(',')).join('\n');
};

export const downloadPredictionAsCSV = (data: PredictionData) => {
  if (!data) return;
  const csvContent = generateCSVContent(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', 'exoplanet_prediction_results.csv');
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
