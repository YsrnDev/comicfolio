import React, { useState, useEffect } from 'react';
import { ProjectManager } from './ProjectManager';
import { MessageCenter } from './MessageCenter';
import { ExperienceManager } from './ExperienceManager';
import { AbilitiesManager } from './AbilitiesManager';
import { useData } from '../../context/DataContext';

export const Dashboard: React.FC = ({ onLogout }: { onLogout: () => void }) => {
  const {
    projects, experiences, messages, skills, gadgets,
    addProject, updateProject, deleteProject,
    addExperience, updateExperience, deleteExperience,
    addSkill, updateSkill, deleteSkill,
    addGadget, updateGadget, deleteGadget,
    markMessageRead,
    refreshMessages
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'experience' | 'abilities' | 'messages'>('overview');

  // Refresh messages on mount (since they are protected and might not be loaded in public context)
  useEffect(() => {
    refreshMessages();
  }, []);

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-comic-dark flex flex-col md:flex-row overflow-hidden relative">

      {/* Mobile Top Header */}
      <div className="md:hidden bg-black border-b-4 border-white p-4 flex justify-between items-center z-40 sticky top-0 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.5)]">
        <span className="text-xl font-bold comic-font text-comic-accent tracking-wider">MISSION CONTROL</span>
        <button onClick={onLogout} className="bg-red-600 text-white font-bold comic-font text-xs px-3 py-1 border-2 border-white shadow-[2px_2px_0px_0px_#000]">LOGOUT</button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-black border-r-4 border-white flex-col relative z-20 h-screen">
        <div className="p-6 border-b-4 border-white bg-comic-accent">
          <h2 className="text-2xl font-bold comic-font text-black">MISSION CONTROL</h2>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'History' },
            { id: 'abilities', label: 'Abilities' },
            { id: 'messages', label: 'Signals', badge: unreadCount }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full text-left p-3 border-2 font-bold comic-font text-xl uppercase transition-all flex justify-between
                ${activeTab === item.id ? 'bg-comic-secondary text-black border-black shadow-[4px_4px_0px_0px_#fff]' : 'text-white border-transparent hover:border-white'}`}
            >
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && <span className="bg-comic-alert text-black text-xs px-2 py-1 rounded-full border border-black">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t-4 border-white">
          <button onClick={onLogout} className="w-full bg-red-600 text-white font-bold comic-font p-2 border-2 border-transparent hover:border-white uppercase">Abort Mission</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-12 md:pb-12 relative h-screen">
        <div className="absolute inset-0 opacity-5 pointer-events-none fixed" style={{ backgroundImage: 'linear-gradient(45deg, #22d3ee 25%, transparent 25%, transparent 75%, #22d3ee 75%, #22d3ee), linear-gradient(45deg, #22d3ee 25%, transparent 25%, transparent 75%, #22d3ee 75%, #22d3ee)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-comic-panel border-4 border-white p-6 shadow-[8px_8px_0px_0px_#facc15]">
                <h3 className="text-white comic-font text-xl mb-2">Missions</h3>
                <p className="text-5xl font-bold text-comic-accent marker-font">{projects.length}</p>
              </div>
              <div className="bg-comic-panel border-4 border-white p-6 shadow-[8px_8px_0px_0px_#22d3ee]">
                <h3 className="text-white comic-font text-xl mb-2">Logs</h3>
                <p className="text-5xl font-bold text-comic-secondary marker-font">{experiences.length}</p>
              </div>
              <div className="bg-comic-panel border-4 border-white p-6 shadow-[8px_8px_0px_0px_#f472b6]">
                <h3 className="text-white comic-font text-xl mb-2">Signals</h3>
                <p className="text-5xl font-bold text-comic-secondary marker-font">{messages.length}</p>
                <p className="text-gray-400 font-mono text-xs">{unreadCount} new</p>
              </div>
              <div className="bg-comic-panel border-4 border-white p-6 shadow-[8px_8px_0px_0px_#4ade80]">
                <h3 className="text-white comic-font text-xl mb-2">Abilities</h3>
                <p className="text-5xl font-bold text-white marker-font">{skills.length + gadgets.length}</p>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <ProjectManager
              projects={projects}
              onCreate={addProject}
              onUpdate={updateProject}
              onDelete={deleteProject}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceManager
              experiences={experiences}
              onCreate={addExperience}
              onUpdate={updateExperience}
              onDelete={deleteExperience}
            />
          )}

          {activeTab === 'abilities' && (
            <AbilitiesManager
              skills={skills}
              gadgets={gadgets}
              onAddSkill={addSkill}
              onUpdateSkill={updateSkill}
              onDeleteSkill={deleteSkill}
              onAddGadget={addGadget}
              onUpdateGadget={updateGadget}
              onDeleteGadget={deleteGadget}
            />
          )}

          {activeTab === 'messages' && (
            <MessageCenter
              messages={messages}
              onMarkRead={markMessageRead}
              onDelete={(id) => console.log("Del", id)}
            />
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t-4 border-white z-50 flex justify-between px-1 py-1 shadow-[0px_-4px_10px_rgba(0,0,0,0.5)] overflow-x-auto">
        {[
          { id: 'overview', icon: '🏠', label: 'Home' },
          { id: 'projects', icon: '🚀', label: 'Proj' },
          { id: 'experience', icon: '📜', label: 'Exp' },
          { id: 'abilities', icon: '⚡', label: 'Abil' },
          { id: 'messages', icon: '📡', label: 'Sig', badge: unreadCount }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex-1 min-w-[60px] mx-0.5 py-1 text-center font-bold comic-font uppercase text-[10px] border-2 transition-all flex flex-col items-center justify-center gap-0.5
                ${activeTab === item.id
                ? 'bg-comic-accent text-black border-black shadow-[2px_2px_0px_0px_#fff] -translate-y-1'
                : 'bg-transparent text-gray-400 border-transparent'}`}
          >
            <div className="relative">
              <span className="text-sm leading-none">{item.icon}</span>
              {item.badge && item.badge > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">{item.badge}</span>}
            </div>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};