'use server'

import {NewProject, Project, ProjectUpdate} from "@/db/types/project-table";
import {projectRepository} from "@/repository/project-repository";

export async function getProject(projectId: number): Promise<Project | undefined> {
    try {
        return await projectRepository.findProjectById(projectId);
    } catch (e) {
        console.error(e);
    }
}

export async function getProjectsByUser(userId: number): Promise<Project[] | undefined> {
    try {
        return await projectRepository.findProjectsByUser(userId);
    } catch (e) {
        console.error(e);
    }
}

export async function getProjects(): Promise<Project[] | undefined> {
    try {
        return await projectRepository.findProjects();
    } catch (e) {
        console.error(e);
    }
}

export async function createProject(newProject: NewProject): Promise<Project | undefined> {
    try {
        return await projectRepository.createProject(newProject);
    } catch (e) {
        console.error(e);
    }
}

export async function updateProject(projectId: number, projectUpdate: ProjectUpdate): Promise<Project | undefined> {
    try {
        return await projectRepository.updateProject(projectId, projectUpdate);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteProject(projectId: number): Promise<Project | undefined> {
    try {
        return await projectRepository.deleteProject(projectId);
    } catch (e) {
        console.error(e);
    }
}

