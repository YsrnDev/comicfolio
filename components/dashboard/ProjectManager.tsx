import React, { useState } from 'react';
import { Project } from '../../types';
import { ComicButton } from '../ui/ComicButton';

interface ProjectManagerProps {
  projects: Project[];
  onCreate: (project: Omit<Project, 'id'>) => Promise<void>;
  onUpdate: (project: Project) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({ projects, onCreate, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to scrap this mission?')) {
      await onDelete(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProject.id) {
      // Edit
      await onUpdate(currentProject as Project);
    } else {
      // Create
      const newProject = {
        ...currentProject,
        tags: typeof currentProject.tags === 'string' ? (currentProject.tags as string).split(',').map((t: string) => t.trim()) : currentProject.tags || []
      } as Omit<Project, 'id'>;
      await onCreate(newProject);
    }
    setIsEditing(false);
    setCurrentProject({});
  };

  const openEdit = (project?: Project) => {
    setCurrentProject(project || { tags: [] });
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto bg-comic-panel border-4 border-white p-6 md:p-8 shadow-[8px_8px_0px_0px_#22d3ee] animate-in fade-in zoom-in-95">
        <h3 className="text-3xl comic-font text-white mb-6 border-b-2 border-white pb-2 inline-block">
          {currentProject.id ? 'EDIT MISSION' : 'NEW MISSION'}
        </h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Title</label>
            <input
              value={currentProject.title || ''}
              onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
              className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
              placeholder="Project Codename"
              required
            />
          </div>
          <div>
            <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Description</label>
            <textarea
              value={currentProject.description || ''}
              onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
              className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
              rows={4}
              placeholder="Briefing details..."
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Tags</label>
              <input
                value={Array.isArray(currentProject.tags) ? currentProject.tags.join(', ') : currentProject.tags || ''}
                onChange={e => setCurrentProject({ ...currentProject, tags: e.target.value.split(',') })}
                className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
                placeholder="React, AI, Cloud..."
              />
              <p className="text-xs text-gray-500 mt-1 font-mono">Separate with commas</p>
            </div>
            <div>
              <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Image URL</label>
              <input
                value={currentProject.imageUrl || ''}
                onChange={e => setCurrentProject({ ...currentProject, imageUrl: e.target.value })}
                className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
                placeholder="https://..."
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <ComicButton type="submit" className="flex-1">SAVE DATA</ComicButton>
            <ComicButton type="button" variant="secondary" onClick={() => setIsEditing(false)} className="flex-1">CANCEL</ComicButton>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000] gap-4">
        <div>
          <h2 className="text-black text-2xl comic-font leading-none">DEPLOYED MISSIONS</h2>
          <p className="text-gray-600 font-mono text-xs mt-1">Manage your active portfolio entries</p>
        </div>
        <button
          onClick={() => openEdit()}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 font-bold hover:bg-comic-accent hover:text-black transition-all border-2 border-transparent hover:border-black shadow-[2px_2px_0px_0px_#888] active:translate-y-[2px] active:shadow-none uppercase comic-font tracking-wide"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-comic-panel border-4 border-white flex flex-col shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#facc15] transition-all relative group h-full">

            {/* Image Area */}
            <div className="relative h-48 border-b-4 border-white overflow-hidden bg-gray-900">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] bg-comic-accent text-black border border-black px-1 font-bold font-mono uppercase">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] bg-white text-black border border-black px-1 font-bold font-mono">+{project.tags.length - 3}</span>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-white comic-font leading-tight mb-2 tracking-wide truncate">{project.title}</h4>
              <p className="text-gray-400 text-xs font-mono line-clamp-3 mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-auto pt-3 border-t-2 border-gray-700">
                <button
                  onClick={() => openEdit(project)}
                  className="bg-comic-secondary text-black font-bold text-sm py-2 border-2 border-black hover:bg-cyan-300 shadow-[2px_2px_0px_0px_#000] active:translate-y-[2px] active:shadow-none uppercase comic-font"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-comic-alert text-black font-bold text-sm py-2 border-2 border-black hover:bg-pink-300 shadow-[2px_2px_0px_0px_#000] active:translate-y-[2px] active:shadow-none uppercase comic-font"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-white border-l-2 border-b-2 border-black"></div>
          </div>
        ))}
      </div>
    </div>
  );
};