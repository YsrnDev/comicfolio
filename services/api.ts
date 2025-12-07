import { Project, Experience, Message, Skill, TechGadget } from '../types';

const API_URL = `http://${window.location.hostname}:4000/api`;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        credentials: 'include', // Important for sending cookies
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            console.error("Unauthorized access");
        }
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
};

export const api = {
    // Projects
    getProjects: async (): Promise<Project[]> => {
        return fetchWithAuth('/projects');
    },
    createProject: async (project: Omit<Project, 'id'>): Promise<Project> => {
        return fetchWithAuth('/projects', {
            method: 'POST',
            body: JSON.stringify(project),
        });
    },
    updateProject: async (project: Project): Promise<void> => {
        return fetchWithAuth(`/projects/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
        });
    },
    deleteProject: async (id: number): Promise<void> => {
        return fetchWithAuth(`/projects/${id}`, {
            method: 'DELETE',
        });
    },

    // Experiences
    getExperiences: async (): Promise<Experience[]> => {
        return fetchWithAuth('/experiences');
    },
    createExperience: async (experience: Omit<Experience, 'id'>): Promise<void> => {
        return fetchWithAuth('/experiences', {
            method: 'POST',
            body: JSON.stringify(experience),
        });
    },
    updateExperience: async (experience: Experience): Promise<void> => {
        return fetchWithAuth(`/experiences/${experience.id}`, {
            method: 'PUT',
            body: JSON.stringify(experience),
        });
    },

    // Skills
    getSkills: async (): Promise<Skill[]> => {
        return fetchWithAuth('/skills');
    },
    createSkill: async (skill: Omit<Skill, 'id'>): Promise<Skill> => {
        return fetchWithAuth('/skills', {
            method: 'POST',
            body: JSON.stringify(skill),
        });
    },
    updateSkill: async (skill: Skill): Promise<void> => {
        return fetchWithAuth(`/skills/${skill.id}`, {
            method: 'PUT',
            body: JSON.stringify(skill),
        });
    },
    deleteSkill: async (id: number): Promise<void> => {
        return fetchWithAuth(`/skills/${id}`, {
            method: 'DELETE',
        });
    },

    // Gadgets
    getGadgets: async (): Promise<TechGadget[]> => {
        return fetchWithAuth('/gadgets');
    },
    createGadget: async (gadget: TechGadget): Promise<TechGadget> => {
        return fetchWithAuth('/gadgets', {
            method: 'POST',
            body: JSON.stringify(gadget),
        });
    },
    updateGadget: async (gadget: TechGadget): Promise<void> => {
        return fetchWithAuth(`/gadgets/${gadget.id}`, {
            method: 'PUT',
            body: JSON.stringify(gadget),
        });
    },
    deleteGadget: async (id: string): Promise<void> => {
        return fetchWithAuth(`/gadgets/${id}`, {
            method: 'DELETE',
        });
    },

    // Messages
    getMessages: async (): Promise<Message[]> => {
        return fetchWithAuth('/messages');
    },
    sendMessage: async (message: { codename: string; email: string; content: string }) => {
        return fetchWithAuth('/messages', {
            method: 'POST',
            body: JSON.stringify(message),
        });
    },
    markMessageRead: async (id: string) => {
        return fetchWithAuth(`/messages/${id}/read`, {
            method: 'PATCH',
        });
    }
};
