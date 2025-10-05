
import React from 'react';
import { VisualizationData } from '../types';
import ChartCard from './ChartCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';

interface VisualizationsProps {
  data: VisualizationData;
}

const statData = (data: VisualizationData) => [
  { name: 'Orbital Period', value: data.orbitalPeriod ?? 0, unit: 'days' },
  { name: 'Transit Duration', value: data.transitDuration ?? 0, unit: 'hours' },
  { name: 'Planetary Radius', value: data.planetaryRadius ?? 0, unit: 'R🜨' },
  { name: 'Stellar Radius', value: data.stellarRadius ?? 0, unit: 'R☉' },
];


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-space-dark p-2 border border-gray-600 rounded-md shadow-lg">
        <p className="label text-white">{`${label} : ${payload[0].value} ${payload[0].payload.unit}`}</p>
      </div>
    );
  }
  return null;
};

const LightCurveTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-space-dark p-2 border border-gray-600 rounded-md shadow-lg">
        <p className="text-sm text-gray-300">{`Time: ${label.toFixed(2)}`}</p>
        <p className="text-sm text-accent-cyan">{`Relative Flux: ${payload[0].value.toFixed(5)}`}</p>
      </div>
    );
  }
  return null;
};

const Visualizations: React.FC<VisualizationsProps> = ({ data }) => {
  const statistics = statData(data);
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-bold font-orbitron mb-4 text-white">Visualizations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Key Statistics">
           <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statistics} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="name" type="category" width={100} stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }} />
              <Bar dataKey="value" fill="#22d3ee" barSize={20}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Light Curve">
          {data.lightCurve && data.lightCurve.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.lightCurve} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="time" stroke="#9ca3af" type="number" domain={['dataMin', 'dataMax']} />
                <YAxis stroke="#9ca3af" domain={['dataMin', 'dataMax']} padding={{top: 20, bottom: 20}}/>
                <Tooltip content={<LightCurveTooltip />}/>
                <Legend wrapperStyle={{color: '#9ca3af'}}/>
                <Line type="monotone" dataKey="flux" name="Relative Flux" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-gray-500">Light curve data not available for this prediction.</p>
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
};

export default Visualizations;