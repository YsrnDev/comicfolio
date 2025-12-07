import React from 'react';

export const DossierButton: React.FC = () => {
  return (
    <button 
      onClick={() => alert("Accessing Classified Mainframe... (Add your PDF link here)")}
      className="group relative inline-block mt-8"
    >
      <div className="relative bg-[#d4b483] border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_#000] transition-transform group-hover:-translate-y-1 group-active:translate-y-1 group-active:shadow-[4px_4px_0px_0px_#000] overflow-hidden">
         {/* Folder Tab Visual */}
         <div className="absolute top-0 left-0 w-24 h-4 bg-[#c19e68] border-r-2 border-b-2 border-black"></div>
         
         <div className="flex items-center gap-3 relative z-10">
            <div className="border-2 border-red-800 p-1 rounded-full">
               <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold text-black comic-font text-xl tracking-wider uppercase">
              Download Top Secret Dossier
            </span>
         </div>
         
         {/* "Classified" Stamp Effect */}
         <div className="absolute -bottom-4 -right-4 border-4 border-red-700/30 text-red-700/30 font-black text-4xl uppercase px-4 py-2 rotate-[-15deg] group-hover:text-red-700/80 group-hover:border-red-700/80 transition-colors pointer-events-none comic-font">
            Classified
         </div>
      </div>
    </button>
  );
};