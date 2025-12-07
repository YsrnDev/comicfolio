import React, { useState } from 'react';
import { Skill, TechGadget } from '../../types';
import { ComicButton } from '../ui/ComicButton';

interface AbilitiesManagerProps {
    skills: Skill[];
    gadgets: TechGadget[];
    onAddSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
    onUpdateSkill: (skill: Skill) => Promise<void>;
    onDeleteSkill: (id: number) => Promise<void>;
    onAddGadget: (gadget: TechGadget) => Promise<void>;
    onUpdateGadget: (gadget: TechGadget) => Promise<void>;
    onDeleteGadget: (id: string) => Promise<void>;
}

export const AbilitiesManager: React.FC<AbilitiesManagerProps> = ({
    skills, gadgets,
    onAddSkill, onUpdateSkill, onDeleteSkill,
    onAddGadget, onUpdateGadget, onDeleteGadget
}) => {
    const [activeTab, setActiveTab] = useState<'skills' | 'gadgets'>('skills');
    const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
    const [editingGadget, setEditingGadget] = useState<Partial<TechGadget> | null>(null);

    // --- SKILLS LOGIC ---
    const handleSaveSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSkill?.id) {
            await onUpdateSkill(editingSkill as Skill);
        } else if (editingSkill) {
            await onAddSkill(editingSkill as Omit<Skill, 'id'>);
        }
        setEditingSkill(null);
    };

    const deleteSkill = async (id?: number) => {
        if (id && window.confirm("Delete this power level?")) {
            await onDeleteSkill(id);
        }
    };

    // --- GADGETS LOGIC ---
    const handleSaveGadget = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingGadget?.id && gadgets.some(g => g.id === editingGadget.id)) {
            // Simple check if existing ID matches (edit mode)
            // Ideally we differentiate create vs update clearly, 
            // but for gadgets ID is manually managed or string. 
            // Let's assume Update if we successfully found it in existing list? 
            // Or simpler: We just call update if we started editing an existing one.
            await onUpdateGadget(editingGadget as TechGadget);
        } else if (editingGadget) {
            await onAddGadget(editingGadget as TechGadget);
        }
        setEditingGadget(null);
    };

    const deleteGadget = async (id: string) => {
        if (window.confirm("Discard this utility?")) {
            await onDeleteGadget(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Sub-Tabs */}
            <div className="flex bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                <button
                    onClick={() => setActiveTab('skills')}
                    className={`flex-1 py-3 text-xl font-bold comic-font uppercase text-center transition-colors
               ${activeTab === 'skills' ? 'bg-comic-primary text-white' : 'text-black hover:bg-gray-200'}`}
                >
                    Power Levels
                </button>
                <button
                    onClick={() => setActiveTab('gadgets')}
                    className={`flex-1 py-3 text-xl font-bold comic-font uppercase text-center transition-colors
               ${activeTab === 'gadgets' ? 'bg-comic-secondary text-black' : 'text-black hover:bg-gray-200'}`}
                >
                    Utility Belt
                </button>
            </div>

            {/* SKILLS SECTION */}
            {activeTab === 'skills' && (
                <div className="animate-in slide-in-from-left duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-2xl comic-font">SKILL SET</h2>
                        <button
                            onClick={() => setEditingSkill({ name: '', level: 50, color: 'bg-comic-accent' })}
                            className="bg-comic-primary text-white border-2 border-white px-4 py-2 font-bold comic-font shadow-[2px_2px_0px_0px_#fff] active:translate-y-1 active:shadow-none"
                        >
                            + ADD SKILL
                        </button>
                    </div>

                    {/* Skill Edit Form */}
                    {editingSkill && (
                        <div className="bg-comic-panel border-4 border-white p-6 mb-6 shadow-[8px_8px_0px_0px_#facc15]">
                            <h3 className="text-white text-xl comic-font mb-4 border-b pb-2">{editingSkill.id ? 'EDIT POWER' : 'NEW POWER'}</h3>
                            <form onSubmit={handleSaveSkill} className="space-y-4">
                                <div>
                                    <label className="text-white font-mono block mb-1">Skill Name</label>
                                    <input
                                        value={editingSkill.name || ''}
                                        onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                                        className="w-full bg-black border-white border p-2 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-white font-mono block mb-1">Power Level (0-100)</label>
                                    <input
                                        type="number"
                                        min="0" max="100"
                                        value={editingSkill.level || 0}
                                        onChange={e => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                                        className="w-full bg-black border-white border p-2 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-white font-mono block mb-1">Aura Color</label>
                                    <select
                                        value={editingSkill.color || 'bg-comic-accent'}
                                        onChange={e => setEditingSkill({ ...editingSkill, color: e.target.value })}
                                        className="w-full bg-black border-white border p-2 text-white"
                                    >
                                        <option value="bg-comic-accent">Cyan (Tech)</option>
                                        <option value="bg-comic-secondary">Yellow (Energy)</option>
                                        <option value="bg-comic-alert">Pink (Psionic)</option>
                                        <option value="bg-green-400">Green (Strength)</option>
                                        <option value="bg-red-500">Red (Rage)</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <ComicButton type="submit">SAVE</ComicButton>
                                    <ComicButton type="button" variant="secondary" onClick={() => setEditingSkill(null)}>CANCEL</ComicButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Skills List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map(skill => (
                            <div key={skill.id} className="bg-gray-900 border-2 border-white p-4 flex justify-between items-center group relative overflow-hidden">
                                {/* Progress Bar Background */}
                                <div className={`absolute left-0 top-0 bottom-0 opacity-20 ${skill.color}`} style={{ width: `${skill.level}%` }}></div>

                                <div className="relative z-10">
                                    <h4 className="text-white font-bold comic-font text-lg">{skill.name}</h4>
                                    <span className={`text-xs font-mono px-2 py-0.5 mt-1 inline-block bg-black border border-white text-white`}>
                                        LVL {skill.level}
                                    </span>
                                </div>

                                <div className="relative z-10 flex gap-2">
                                    <button onClick={() => setEditingSkill(skill)} className="text-sm font-bold text-cyan-400 hover:text-white uppercase">EDIT</button>
                                    <button onClick={() => deleteSkill(skill.id)} className="text-sm font-bold text-red-500 hover:text-red-300 uppercase">DEL</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* GADGETS SECTION */}
            {activeTab === 'gadgets' && (
                <div className="animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-2xl comic-font">INVENTORY</h2>
                        <button
                            onClick={() => setEditingGadget({ name: '', icon: '🔧', description: '' })}
                            className="bg-comic-secondary text-black border-2 border-black px-4 py-2 font-bold comic-font shadow-[2px_2px_0px_0px_#fff] active:translate-y-1 active:shadow-none"
                        >
                            + ADD GADGET
                        </button>
                    </div>

                    {/* Gadget Edit Form */}
                    {editingGadget && (
                        <div className="bg-comic-panel border-4 border-white p-6 mb-6 shadow-[8px_8px_0px_0px_#22d3ee]">
                            <h3 className="text-white text-xl comic-font mb-4 border-b pb-2">{editingGadget.id ? 'MOD GADGET' : 'NEW GADGET'}</h3>
                            <form onSubmit={handleSaveGadget} className="space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-3">
                                        <label className="text-white font-mono block mb-1">Name</label>
                                        <input
                                            value={editingGadget.name || ''}
                                            onChange={e => setEditingGadget({ ...editingGadget, name: e.target.value })}
                                            className="w-full bg-black border-white border p-2 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-white font-mono block mb-1">Icon</label>
                                        <input
                                            value={editingGadget.icon || ''}
                                            onChange={e => setEditingGadget({ ...editingGadget, icon: e.target.value })}
                                            className="w-full bg-black border-white border p-2 text-center text-2xl"
                                            placeholder="🔫"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-white font-mono block mb-1">Description</label>
                                    <input
                                        value={editingGadget.description || ''}
                                        onChange={e => setEditingGadget({ ...editingGadget, description: e.target.value })}
                                        className="w-full bg-black border-white border p-2 text-white"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <ComicButton type="submit">SAVE</ComicButton>
                                    <ComicButton type="button" variant="secondary" onClick={() => setEditingGadget(null)}>CANCEL</ComicButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Gadgets List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gadgets.map(gadget => (
                            <div key={gadget.id} className="bg-black border-2 border-white p-4 flex flex-col items-center text-center hover:bg-gray-900 transition-colors relative group">
                                {/* Delete Button (visible on hover) */}
                                <button
                                    onClick={() => deleteGadget(gadget.id)}
                                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 font-bold hover:scale-110 active:scale-95 transition-all text-xs border border-red-500 px-1"
                                >
                                    X
                                </button>
                                <button
                                    onClick={() => setEditingGadget(gadget)}
                                    className="absolute top-2 left-2 text-cyan-400 opacity-0 group-hover:opacity-100 font-bold hover:scale-110 active:scale-95 transition-all text-xs border border-cyan-400 px-1"
                                >
                                    EDIT
                                </button>

                                <div className="text-4xl mb-2">{gadget.icon}</div>
                                <h4 className="text-comic-secondary font-bold comic-font text-lg uppercase mb-1">{gadget.name}</h4>
                                <p className="text-gray-400 font-mono text-xs leading-tight">{gadget.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
