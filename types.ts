export interface ExoplanetData {
  fileName?: string;
  orbitalPeriod?: number;
  transitDuration?: number;
  transitDepth?: number;

  // Optional fields used for backend feature defaults
  planetRadius?: number;
  equilibriumTemp?: number;
  insolation?: number;
  modelSNR?: number;
  stellarTemp?: number;
  stellarLogg?: number;
  stellarRadius?: number;
}

export enum Classification {
  Confirmed = 'Confirmed',
  Candidate = 'Candidate',
  FalsePositive = 'False Positive',
}

export interface Prediction {
  classification: Classification;
  confidence: number;
  justification: string;
}

export interface LightCurvePoint {
  time: number;
  flux: number;
}

export interface VisualizationData {
  orbitalPeriod: number;
  transitDuration: number;
  planetaryRadius: number;
  stellarRadius: number;
  lightCurve: LightCurvePoint[];
  planetType: string;
  stellarType: string;
  discoveryYear: number;
}

export interface PredictionData {
  prediction: Prediction;
  visualizations: VisualizationData;
}

export interface CelestialObject {
  id: string;
  type: 'Star' | 'Exoplanet' | 'Planet';
  radius: number;
  distance: number;
  color: string;
  info: {
    [key: string]: string | number;
  };
}
