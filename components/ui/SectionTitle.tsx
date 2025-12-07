import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12 text-center relative z-10">
      <h2 className="text-6xl md:text-8xl text-white text-stroke-black mb-2 relative inline-block">
        <span className="relative z-10">{title}</span>
        {/* Shadow Text effect */}
        <span className="absolute top-1 left-1 md:top-2 md:left-2 text-comic-secondary -z-10 w-full">{title}</span>
      </h2>
      {subtitle && (
        <div className="bg-black inline-block px-4 py-1 rotate-[-2deg] mt-4 border-2 border-white shadow-[4px_4px_0px_0px_#facc15]">
          <p className="text-xl md:text-2xl text-white marker-font">{subtitle}</p>
        </div>
      )}
    </div>
  );
};