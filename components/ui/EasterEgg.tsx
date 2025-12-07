import React, { useEffect, useState } from 'react';

interface EasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="relative max-w-2xl w-full text-center">
        
        {/* Burst Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-comic-accent z-0 animate-spin-slow" 
             style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
        </div>
        
        <div className="relative z-10 animate-in zoom-in-50 duration-500">
           <h1 className="text-8xl md:text-9xl text-comic-alert font-black comic-font drop-shadow-[8px_8px_0px_#000] transform -rotate-6">
             POW!
           </h1>
           
           <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_#22d3ee] transform rotate-2 mt-8">
             <h2 className="text-3xl md:text-5xl font-bold comic-font text-black mb-4">
               SECRET MODE UNLOCKED!
             </h2>
             <p className="text-xl font-mono text-gray-800">
               You found the hidden stash! Here's a free cheat code for life:
             </p>
             <div className="mt-6 bg-black text-comic-accent font-mono text-2xl p-4 border-2 border-dashed border-gray-500">
               ALWAYS_BE_CODING_2025
             </div>
             <p className="mt-4 text-sm text-gray-500 font-mono">
               (Click anywhere to close)
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};