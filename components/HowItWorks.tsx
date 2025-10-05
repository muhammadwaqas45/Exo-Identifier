import React from 'react';

// FIX: Reverted type from React.ReactElement back to the more idiomatic JSX.Element,
// as the root cause of the missing JSX namespace has been fixed in aframe.d.ts.
const Step: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent-purple/20 text-accent-purple">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{children}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="container mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-center mb-8 text-white">From Data to Discovery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Step 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
              title="1. Provide Data"
            >
              Upload your light curve data or manually input key parameters like orbital period and transit duration.
            </Step>
            <Step 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 19.778l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a6 6 0 100-12 6 6 0 000 12z" /></svg>}
              title="2. AI Analysis"
            >
              Our Gemini-powered model analyzes the data, classifies the signal, and calculates a confidence score.
            </Step>
            <Step 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
              title="3. Visualize Results"
            >
              Explore the findings through interactive charts, including a synthesized light curve and key planetary statistics.
            </Step>
        </div>
    </section>
  );
};

export default HowItWorks;