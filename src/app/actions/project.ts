'use server'

import {NewProject, Project, ProjectUpdate} from "@/db/types/project-table";
import {projectRepository} from "@/repository/project-repository";
import {projectSchema} from "@/schema/project-schema";
import {put} from "@vercel/blob";
import {handleBase64Image} from "@/utils/upload-file";

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

export async function createProject(formData: FormData): Promise<Project | undefined> {
    try {

        const newProject = projectSchema.parse({
            name: formData.get("name") as string,
            ticker: formData.get("ticker") as string,
            image: await handleBase64Image(formData.get("image") as string),
            description: formData.get("description") as string,
            initialMarketCap: formData.get("initialMarketCap") as string,
            initialSupply: formData.get("initialSupply") as string,
            userId: Number(formData.get("userId")),
        });

        const validateField = projectSchema.safeParse(newProject);

        if (!validateField.success) {
            throw new Error(validateField.error.errors[0].message);
        }

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

