import React from 'react';
import { Experience as ExperienceType } from '../../types'; // Renamed to avoid conflict
import { SectionTitle } from '../ui/SectionTitle';

interface ExperienceProps {
  data?: ExperienceType[]; // Made optional for backward compatibility if needed, but handled in App
}

export const Experience: React.FC<ExperienceProps> = ({ data = [] }) => {
  return (
    <section id="experience" className="py-24 bg-comic-dark relative border-t-4 border-white overflow-hidden">
      {/* Background Halftone Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(#22d3ee 2px, transparent 2px)',
             backgroundSize: '20px 20px'
           }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="THE SAGA SO FAR" subtitle="Chronicles of development" />

        <div className="relative max-w-5xl mx-auto mt-16">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 bg-white border-x-2 border-black transform md:-translate-x-1/2 z-0"></div>

          <div className="space-y-12">
            {data.length === 0 && (
               <div className="text-center bg-comic-panel border-4 border-white p-6 relative z-10">
                  <p className="text-gray-400 font-mono">No saga recorded yet...</p>
               </div>
            )}
            
            {data.map((exp, index) => (
              <div key={exp.id} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative`}>
                
                {/* Timeline Node (The Circle) */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-comic-accent border-4 border-black rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-20 shadow-[0px_0px_0px_4px_#fff]"></div>

                {/* Content Panel */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className={`
                    bg-comic-panel border-4 border-white p-6 relative group
                    shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#f472b6] 
                    transition-all hover:-translate-y-1
                  `}>
                    {/* Speech bubble tail */}
                    <div className={`
                      hidden md:block absolute top-1/2 w-6 h-6 bg-comic-panel border-b-4 border-r-4 border-white transform rotate-45 -translate-y-1/2 z-10
                      ${index % 2 === 0 ? '-right-4 border-r-0 border-b-0 border-t-4 border-r-4' : '-left-4 border-t-0 border-r-0 border-b-4 border-l-4'}
                    `}></div>

                    <div className="absolute -top-4 -left-2 bg-black text-white px-3 py-1 text-sm font-mono border-2 border-white transform -rotate-2">
                      {exp.period}
                    </div>

                    <h3 className="text-2xl text-comic-secondary comic-font mt-2 uppercase">{exp.role}</h3>
                    <h4 className="text-xl text-white marker-font mb-4">@ {exp.company}</h4>
                    <p className="text-gray-300 font-mono leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom "To Be Continued" */}
          <div className="text-center mt-16 relative z-20">
             <div className="inline-block bg-white border-4 border-black px-8 py-3 shadow-[6px_6px_0px_0px_#22d3ee] transform rotate-2">
                <span className="text-3xl font-bold comic-font text-black tracking-widest">TO BE CONTINUED...</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};