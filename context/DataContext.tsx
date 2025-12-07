import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Experience, Message, Skill, TechGadget } from '../types';
import { api } from '../services/api';

interface DataContextType {
    projects: Project[];
    experiences: Experience[];
    messages: Message[];
    skills: Skill[];
    gadgets: TechGadget[];
    loading: boolean;
    refreshProjects: () => Promise<void>;
    refreshExperiences: () => Promise<void>;
    refreshMessages: () => Promise<void>;
    refreshSkills: () => Promise<void>;
    refreshGadgets: () => Promise<void>;
    // Actions
    addProject: (p: Omit<Project, 'id'>) => Promise<void>;
    updateProject: (p: Project) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
    addExperience: (e: Omit<Experience, 'id'>) => Promise<void>;
    updateExperience: (e: Experience) => Promise<void>;
    deleteExperience: (id: number) => Promise<void>; // Placeholder if API missing
    sendMessage: (m: Omit<Message, 'id' | 'timestamp' | 'read'>) => Promise<void>;
    markMessageRead: (id: string) => Promise<void>;
    addSkill: (s: Omit<Skill, 'id'>) => Promise<void>;
    updateSkill: (s: Skill) => Promise<void>;
    deleteSkill: (id: number) => Promise<void>;
    addGadget: (g: TechGadget) => Promise<void>;
    updateGadget: (g: TechGadget) => Promise<void>;
    deleteGadget: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [gadgets, setGadgets] = useState<TechGadget[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshProjects = async () => { setProjects(await api.getProjects()); };
    const refreshExperiences = async () => { setExperiences(await api.getExperiences()); };
    const refreshMessages = async () => {
        try {
            setMessages(await api.getMessages());
        } catch (e) {
            console.warn("Messages restricted (Auth required)");
        }
    };
    const refreshSkills = async () => { setSkills(await api.getSkills()); };
    const refreshGadgets = async () => { setGadgets(await api.getGadgets()); };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    refreshProjects(),
                    refreshExperiences(),
                    refreshSkills(),
                    refreshGadgets()
                    // refreshMessages() - Don't auto-fetch messages on public load to avoid 401 console spam if not logged in
                ]);
            } catch (e) {
                console.error("Failed to load initial data", e);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    // CRUD Wrappers
    const addProject = async (p: Omit<Project, 'id'>) => { await api.createProject(p); await refreshProjects(); };
    const updateProject = async (p: Project) => { await api.updateProject(p); await refreshProjects(); };
    const deleteProject = async (id: number) => { await api.deleteProject(id); await refreshProjects(); };

    const addExperience = async (e: Omit<Experience, 'id'>) => { await api.createExperience(e); await refreshExperiences(); };
    const updateExperience = async (e: Experience) => { await api.updateExperience(e); await refreshExperiences(); };
    const deleteExperience = async (id: number) => {
        // await api.deleteExperience(id); 
        console.warn("Delete experience not implemented on server yet");
        // Simulate UI update or alert
    };

    const sendMessage = async (m: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
        await api.sendMessage(m);
        // We don't refresh messages here because user might be public.
        // Optimistic update could happen in component if needed.
    };

    const markMessageRead = async (id: string) => { await api.markMessageRead(id); await refreshMessages(); };

    const addSkill = async (s: Omit<Skill, 'id'>) => { await api.createSkill(s); await refreshSkills(); };
    const updateSkill = async (s: Skill) => { await api.updateSkill(s); await refreshSkills(); };
    const deleteSkill = async (id: number) => { await api.deleteSkill(id); await refreshSkills(); };

    const addGadget = async (g: TechGadget) => { await api.createGadget(g); await refreshGadgets(); };
    const updateGadget = async (g: TechGadget) => { await api.updateGadget(g); await refreshGadgets(); };
    const deleteGadget = async (id: string) => { await api.deleteGadget(id); await refreshGadgets(); };

    return (
        <DataContext.Provider value={{
            projects, experiences, messages, skills, gadgets, loading,
            refreshProjects, refreshExperiences, refreshMessages, refreshSkills, refreshGadgets,
            addProject, updateProject, deleteProject,
            addExperience, updateExperience, deleteExperience,
            sendMessage, markMessageRead,
            addSkill, updateSkill, deleteSkill,
            addGadget, updateGadget, deleteGadget
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
