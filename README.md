# Kepler’s Legacy – AI Exoplanet Identifier


## Overview
Kepler’s Legacy is an AI-powered web application that automatically analyzes exoplanet survey data from NASA missions (Kepler, K2, TESS) to classify celestial bodies as **Confirmed Exoplanets**, **Candidates**, or **False Positives**. This tool simplifies the identification process, allowing both researchers and enthusiasts to interact with exoplanet data through a user-friendly interface.

## Features
- **Manual or File Input:** Enter parameters manually or upload CSV/Excel datasets.
- **AI Prediction:** Powered by a trained ML model for accurate classification.
- **Interactive Visualizations:** Explore light curves and planetary characteristics.
- **3D Solar System View:** Visualize predictions in a 3D environment.
- **Demo Inputs:** Quickly test predictions with preloaded examples.

## Technologies
- **Frontend:** React, TypeScript, TailwindCSS, A-Frame (3D visualization)
- **Backend:** Python Flask (for model inference)
- **AI/ML:** Scikit-learn (pretrained Random Forest classifier)
- **Data:** Public NASA datasets (Kepler, K2, TESS)

## Getting Started
1. Clone the repository:
```bash
git clone https://github.com/muhammadwaqas45/Exo-Identifier.git
cd Exo-Identifier
