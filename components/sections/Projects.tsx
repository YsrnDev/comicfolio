import React from 'react';
import { Project } from '../../types';
import { SectionTitle } from '../ui/SectionTitle';

interface ProjectsProps {
  data: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <section id="projects" className="py-24 bg-comic-dark relative border-t-4 border-white">
       {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 10%, transparent 10%, transparent 50%, #ffffff 50%, #ffffff 60%, transparent 60%, transparent 100%)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="MISSIONS" subtitle="Past exploits and victories" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {data.map((project) => (
            <div key={project.id} className="group relative">
              {/* Comic Panel Frame */}
              <div className="bg-comic-panel border-4 border-white h-full flex flex-col shadow-[8px_8px_0px_0px_#22d3ee] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#facc15]">
                
                {/* Image Container with halftone overlay */}
                <div className="relative h-48 overflow-hidden border-b-4 border-white bg-gray-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_120%)]"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-3xl text-comic-accent mb-2 uppercase drop-shadow-md">{project.title}</h3>
                  <p className="text-gray-300 font-sans mb-6 text-lg leading-snug flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-black text-white px-2 py-1 text-sm border border-white font-mono uppercase tracking-tighter">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-comic-alert border-2 border-black z-20 group-hover:rotate-45 transition-transform"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};