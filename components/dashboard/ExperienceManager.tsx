import React, { useState } from 'react';
import { Experience } from '../../types';
import { ComicButton } from '../ui/ComicButton';

interface ExperienceManagerProps {
  experiences: Experience[];
  onCreate: (experience: Omit<Experience, 'id'>) => Promise<void>;
  onUpdate: (experience: Experience) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const ExperienceManager: React.FC<ExperienceManagerProps> = ({ experiences, onCreate, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({});

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to redact this record from history?')) {
      await onDelete(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentExp.id) {
      // Edit
      await onUpdate(currentExp as Experience);
    } else {
      // Create
      const newExp = {
        ...currentExp,
        side: 'left' // Default value, UI handles alternation or backend
      } as Omit<Experience, 'id'>;
      await onCreate(newExp);
    }
    setIsEditing(false);
    setCurrentExp({});
  };

  const openEdit = (exp?: Experience) => {
    setCurrentExp(exp || { role: '', company: '', period: '', description: '' });
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto bg-comic-panel border-4 border-white p-6 md:p-8 shadow-[8px_8px_0px_0px_#f472b6] animate-in fade-in zoom-in-95">
        <h3 className="text-3xl comic-font text-white mb-6 border-b-2 border-white pb-2 inline-block">
          {currentExp.id ? 'REWRITE HISTORY' : 'NEW CHAPTER'}
        </h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Role / Title</label>
              <input
                value={currentExp.role || ''}
                onChange={e => setCurrentExp({ ...currentExp, role: e.target.value })}
                className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
                placeholder="e.g. Lead Hero"
                required
              />
            </div>
            <div>
              <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Company / Org</label>
              <input
                value={currentExp.company || ''}
                onChange={e => setCurrentExp({ ...currentExp, company: e.target.value })}
                className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
                placeholder="e.g. Avengers HQ"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Time Period</label>
            <input
              value={currentExp.period || ''}
              onChange={e => setCurrentExp({ ...currentExp, period: e.target.value })}
              className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
              placeholder="e.g. 2020 - Present"
              required
            />
          </div>
          <div>
            <label className="text-comic-secondary font-bold comic-font text-lg block mb-1">Description</label>
            <textarea
              value={currentExp.description || ''}
              onChange={e => setCurrentExp({ ...currentExp, description: e.target.value })}
              className="w-full bg-black border-2 border-white text-white p-2 font-mono focus:border-comic-accent outline-none"
              rows={4}
              placeholder="Describe your heroic feats..."
              required
            />
          </div>

          <div className="flex gap-4 pt-6">
            <ComicButton type="submit" className="flex-1">SAVE RECORD</ComicButton>
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
          <h2 className="text-black text-2xl comic-font leading-none">TIMELINE EDITOR</h2>
          <p className="text-gray-600 font-mono text-xs mt-1">Chronicle your journey</p>
        </div>
        <button
          onClick={() => openEdit()}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 font-bold hover:bg-comic-accent hover:text-black transition-all border-2 border-transparent hover:border-black shadow-[2px_2px_0px_0px_#888] active:translate-y-[2px] active:shadow-none uppercase comic-font tracking-wide"
        >
          + Add Event
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="bg-comic-panel border-l-8 border-comic-accent border-y-2 border-r-2 border-white p-6 relative group hover:bg-slate-800 transition-colors">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-black text-white text-xs px-2 py-1 font-mono border border-white">{exp.period}</span>
                  <h3 className="text-xl font-bold text-comic-secondary comic-font uppercase tracking-wide">{exp.role}</h3>
                </div>
                <h4 className="text-white marker-font text-lg mb-2">@ {exp.company}</h4>
                <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl">{exp.description}</p>
              </div>

              <div className="flex md:flex-col gap-2 justify-start md:justify-center min-w-[100px]">
                <button
                  onClick={() => openEdit(exp)}
                  className="flex-1 bg-comic-secondary text-black font-bold text-xs px-3 py-2 border-2 border-black hover:bg-cyan-300 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none uppercase comic-font"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="flex-1 bg-comic-alert text-black font-bold text-xs px-3 py-2 border-2 border-black hover:bg-pink-300 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none uppercase comic-font"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-gray-500 font-mono">History has been erased...</p>
          </div>
        )}
      </div>
    </div>
  );
};