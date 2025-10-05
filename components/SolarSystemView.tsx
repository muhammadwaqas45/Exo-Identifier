import React, { useState, useMemo, useEffect } from 'react';
import { PredictionData, CelestialObject } from '../types';

interface SolarSystemViewProps {
  data: PredictionData;
  onClose: () => void;
}

const generateSystem = (data: PredictionData): CelestialObject[] => {
    const { visualizations: viz, prediction } = data;
    const system: CelestialObject[] = [];

    // Provide safe defaults for all visualization properties to prevent NaN errors
    const stellarRadius = viz.stellarRadius ?? 1;
    const stellarType = viz.stellarType ?? 'Unknown Star';
    const orbitalPeriod = viz.orbitalPeriod ?? 365;
    const planetaryRadius = viz.planetaryRadius ?? 1;
    const planetType = viz.planetType ?? 'Unknown Planet';
    const discoveryYear = viz.discoveryYear ?? new Date().getFullYear();
  
    // Star
    system.push({
      id: 'host-star',
      type: 'Star',
      radius: Math.max(1, stellarRadius * 0.8), // Scaled for visualization
      distance: 0,
      color: '#FFD700',
      info: { 
        Name: 'Host Star', 
        Type: stellarType,
        'Radius (R☉)': stellarRadius 
      }
    });
  
    // Analyzed Exoplanet - using logarithmic scale for distance
    // Guard against negative values that would cause Math.log10 to return NaN
    const safeOrbitalPeriod = Math.max(0, orbitalPeriod);
    const safePlanetaryRadius = Math.max(0, planetaryRadius);

    const exoplanetDistance = 5 * Math.log10(safeOrbitalPeriod + 1) + stellarRadius;
    system.push({
      id: 'exoplanet',
      type: 'Exoplanet',
      radius: Math.max(0.1, safePlanetaryRadius * 0.05 * Math.log10(safePlanetaryRadius + 1)), // Scaled for visualization
      distance: exoplanetDistance,
      color: '#22d3ee',
      info: {
        Name: 'Analyzed Object',
        Type: planetType,
        Classification: prediction.classification,
        'Confidence': `${prediction.confidence ?? 0}%`,
        'Orbital Period (days)': orbitalPeriod,
        'Radius (R🜨)': planetaryRadius,
        'Discovery Year': discoveryYear,
      }
    });

    // Add a few other random planets for context
    for (let i = 0; i < 3; i++) {
        const randomDistance = exoplanetDistance + (Math.random() * 5) + (i + 1) * 4;
        const randomRadius = Math.random() * 4 + 1;
        system.push({
            id: `planet-${i}`,
            type: 'Planet',
            radius: Math.max(0.1, randomRadius * 0.05 * Math.log10(randomRadius + 1)),
            distance: randomDistance,
            color: ['#E3A869', '#A4C6DE', '#D88A58'][i],
            info: { Name: `Planet ${String.fromCharCode(66 + i)}`, Type: 'Rocky Planet' }
        });
    }
  
    return system.sort((a, b) => a.distance - b.distance);
};

const InfoPanel: React.FC<{ object: CelestialObject | null }> = ({ object }) => {
    if (!object) return (
      <div className="absolute top-4 left-4 bg-space-dark/80 backdrop-blur-sm p-4 rounded-lg border border-gray-600 shadow-lg text-white text-sm animate-fade-in w-60">
        <h4 className="font-bold text-base mb-2 text-gray-300">System Explorer</h4>
        <p className="text-gray-400">Click an object for details. Drag to rotate and scroll to zoom.</p>
      </div>
    );

    return (
        <div className="absolute top-4 left-4 bg-space-dark/80 backdrop-blur-sm p-4 rounded-lg border border-gray-600 shadow-lg text-white text-sm animate-fade-in w-60">
            <h4 className="font-bold text-lg mb-2 text-accent-cyan">{object.info.Name}</h4>
            <ul className="space-y-1.5">
                {Object.entries(object.info).map(([key, value]) => key !== 'Name' && (
                     <li key={key} className="flex justify-between border-b border-gray-700/50 pb-1">
                        <span className="text-gray-400">{key}:</span> 
                        <span className="font-semibold">{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const SolarSystemView: React.FC<SolarSystemViewProps> = ({ data, onClose }) => {
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);
  const system = useMemo(() => generateSystem(data), [data]);
  const exoplanet = system.find(obj => obj.type === 'Exoplanet');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
        if(e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose])


  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in" aria-modal="true">
        <div className="relative w-full h-full">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 text-white bg-black/50 rounded-full p-2 hover:bg-white/20 transition-colors" aria-label="Close 3D View">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <InfoPanel object={selectedObject} />
            
            <a-scene embedded vr-mode-ui="enabled: true" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
                {/* Environment */}
                <a-sky color="#000000"></a-sky>
                <a-entity particle-system="preset: dust; particleCount: 5000; color: #FFF"></a-entity>

                {/* Lighting & Camera */}
                <a-entity light="type: ambient; color: #444"></a-entity>
                <a-entity light="type: point; intensity: 1.5; color: #FFF" position="0 0.5 0"></a-entity>
                
                 {/* Orbit controls replace wasd/look-controls for better scene exploration */}
                <a-entity id="camera" camera position="0 5 20" 
                    orbit-controls="
                        target: 0 0 0;
                        enableDamping: true;
                        dampingFactor: 0.1;
                        rotateSpeed: 0.3;
                        minDistance: 5;
                        maxDistance: 60;
                        autoRotate: true;
                        autoRotateSpeed: 0.05;
                    ">
                </a-entity>

                {/* System Objects */}
                {system.map(obj => (
                    <a-entity 
                        key={obj.id} 
                        position={`${obj.distance} 0 0`}
                    >
                        {/* Star Glow */}
                        {obj.type === 'Star' && (
                             <a-sphere 
                                radius={obj.radius * 1.5} 
                                material="shader: flat; color: #FFD700; transparent: true; opacity: 0.3; side: back"
                            ></a-sphere>
                        )}

                        <a-sphere
                            className="clickable"
                            radius={obj.radius}
                            color={obj.color}
                            onClick={() => setSelectedObject(obj)}
                            event-set__enter={`_event: mouseenter; _target: #${obj.id}-label; visible: true`}
                            event-set__leave={`_event: mouseleave; _target: #${obj.id}-label; visible: false`}
                        ></a-sphere>

                         {/* Hover Label */}
                         <a-entity id={`${obj.id}-label`} position={`0 ${obj.radius + 0.3} 0`} visible="false" look-at="[camera]">
                            <a-text value={`${obj.info.Name} (${obj.info.Type || obj.type})`} align="center" color="#FFF" width="6"></a-text>
                         </a-entity>

                        {/* Exoplanet Glow */}
                        {obj.type === 'Exoplanet' && (
                            <a-sphere 
                                radius={obj.radius * 1.5} 
                                material="shader: flat; color: #22d3ee; transparent: true; opacity: 0.3; side: back"
                            ></a-sphere>
                        )}
                    </a-entity>
                ))}

                {/* Asteroid Belt */}
                {Array.from({ length: 200 }).map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const radius = 22 + (Math.random() - 0.5) * 5; 
                  const x = Math.cos(angle) * radius;
                  const z = Math.sin(angle) * radius;
                  const y = (Math.random() - 0.5) * 0.3;
                  return (
                    <a-dodecahedron
                      key={`asteroid-${i}`}
                      position={`${x} ${y} ${z}`}
                      color="#5C4033"
                      radius={Math.random() * 0.12 + 0.05}
                      radius-detail="0"
                    ></a-dodecahedron>
                  );
                })}
                
                {/* Exoplanet Orbit Highlight */}
                {exoplanet && (
                     <a-torus
                        color="#22d3ee"
                        radius={exoplanet.distance}
                        radius-tubular="0.015"
                        rotation="90 0 0"
                        segments-tubular="128"
                    ></a-torus>
                )}

            </a-scene>
        </div>
    </div>
  );
};

export default SolarSystemView;