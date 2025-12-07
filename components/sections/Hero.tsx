import React from 'react';
import { ComicButton } from '../ui/ComicButton';
import { DossierButton } from '../ui/DossierButton';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(circle, #475569 2px, transparent 2px)',
             backgroundSize: '30px 30px'
           }}
      />
      
      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Panel: Text */}
        <div className="space-y-8 text-center md:text-left">
          <div className="inline-block bg-comic-accent border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#fff] mb-4 transform -rotate-2">
            <span className="text-black font-bold comic-font text-xl">THE ORIGIN STORY</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl text-white leading-[0.9]">
            FULL STACK <br/>
            <span className="text-comic-secondary drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">HERO</span>
          </h1>
          
          <div className="bg-comic-panel border-4 border-white p-6 shadow-[8px_8px_0px_0px_#000] relative max-w-lg">
             <div className="absolute -top-6 -left-6 bg-comic-alert text-black font-bold px-3 py-1 border-2 border-black rotate-[-10deg] comic-font text-lg">
                SECRET IDENTITY
             </div>
             <p className="text-xl md:text-2xl font-medium leading-relaxed marker-font text-gray-200">
               "By day, I blend into the crowd. But when the commit signal lights up, I build scalable web applications with React & Node.js!"
             </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4 pt-4">
             <div className="flex flex-col md:flex-row gap-4">
               <ComicButton onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
                  View Missions
               </ComicButton>
               <ComicButton variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                  Signal Me
               </ComicButton>
             </div>
             
             {/* New Resume Button */}
             <DossierButton />
          </div>
        </div>

        {/* Right Panel: Visual/Avatar */}
        <div className="hidden md:flex justify-center relative">
          {/* Comic Burst Shape behind image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-comic-secondary z-[-1]" 
               style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
          </div>
          
          <div className="relative border-4 border-black bg-white p-2 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-[12px_12px_0px_0px_#facc15]">
            <img 
              src="https://picsum.photos/400/500" 
              alt="Developer Avatar" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 contrast-125"
            />
            <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-4 py-1">
              <span className="text-black font-bold comic-font text-2xl">THE CODER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};