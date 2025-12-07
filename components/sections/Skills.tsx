import React from 'react';
import { Skill } from '../../types';
import { SectionTitle } from '../ui/SectionTitle';

interface SkillsProps {
  data: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  return (
    <section className="py-24 bg-[#162032] border-t-4 border-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="POWER LEVELS" subtitle="Technical arsenal analysis" />

        <div className="max-w-4xl mx-auto bg-black border-4 border-white p-8 md:p-12 shadow-[12px_12px_0px_0px_#f472b6]">
          <div className="space-y-8">
            {data.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl md:text-3xl text-white comic-font tracking-wide uppercase">
                    {skill.name}
                  </span>
                  <span className="text-xl text-comic-accent marker-font">{skill.level}/100</span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-8 w-full bg-gray-800 border-2 border-white relative">
                  {/* Stripes pattern background for empty part */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px)' }}></div>

                  {/* Filled Bar */}
                  <div
                    className={`h-full ${skill.color} border-r-4 border-black transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  >
                    {/* Shine effect */}
                    <div className="w-full h-1/2 bg-white opacity-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-comic-secondary border-2 border-black transform rotate-1 text-center">
            <p className="text-black font-bold text-xl uppercase comic-font">
              Warning: Power levels are constantly increasing due to continuous learning!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};