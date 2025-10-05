
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-space-blue/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={onLogoClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold font-orbitron text-white tracking-widest" style={{textShadow: '0 0 8px rgba(34, 211, 238, 0.5)'}}>
            EXO-IDENTIFIER
          </h1>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-accent-cyan transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
