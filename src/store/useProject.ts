import {Project} from "@/db/types/project-table";
import {create} from "zustand";

type ProjectStore = {
    projects: Project[] | null;
    setProjects: (projects: Project[]) => void;
    project: Project | null;
    setProject: (project: Project| null) => void;
}

export const useProject = create<ProjectStore>((set) => ({
    projects: null,
    setProjects: (projects: Project[]) => set({ projects }),
    project: null,
    setProject: (project: Project | null) => set({ project }),
}));