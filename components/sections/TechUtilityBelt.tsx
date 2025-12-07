import React from 'react';
import { TechGadget } from '../../types';
import { SectionTitle } from '../ui/SectionTitle';

interface TechUtilityBeltProps {
  data: TechGadget[];
}

export const TechUtilityBelt: React.FC<TechUtilityBeltProps> = ({ data }) => {
  return (
    <section className="py-20 bg-gray-900 border-t-4 border-white relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h3 className="text-3xl text-comic-accent comic-font mb-8 uppercase tracking-widest bg-black inline-block px-6 py-2 border-2 border-white transform -rotate-1">
          The Utility Belt (Tech Stack)
        </h3>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
          {data.map((gadget) => (
            <div key={gadget.id} className="group relative">
              {/* Gadget Container */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 border-4 border-gray-600 rounded-2xl flex flex-col items-center justify-center shadow-[0px_4px_0px_0px_#000] group-hover:bg-gray-700 group-hover:-translate-y-2 transition-all relative overflow-hidden">

                {/* Metal shine effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 pointer-events-none"></div>

                <span className="text-4xl md:text-5xl mb-1 group-hover:scale-110 transition-transform block">
                  {gadget.icon}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 font-mono uppercase">
                  {gadget.name}
                </span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-comic-accent border-2 border-black p-2 text-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <p className="text-black text-xs font-bold comic-font leading-tight">{gadget.description}</p>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-comic-accent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};