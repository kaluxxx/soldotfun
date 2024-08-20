'use server'

import { projectRepository } from "@/repository/project-repository";
import {createProjectSchema, updateProjectSchema} from "@/schema/project-schema";
import { handleBase64Image } from "@/utils/upload-file";
import { isGranted } from "@/utils/is-granted";
import { ProjectResponse, ProjectsResponse } from "@/types/response";
import {NewProject, ProjectUpdate} from "@/db/types/project-table";

const ALLOWED_ROLES = ["admin", "moderator"];

export async function getProject(projectId: number): Promise<ProjectResponse> {
    try {
        const project = await projectRepository.findProjectById(projectId);
        return { status: 200, data: project };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function getProjectsByUser(userId: number): Promise<ProjectsResponse> {
    try {
        const projects = await projectRepository.findProjectsByUser(userId);
        return { status: 200, data: projects };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function getProjects(): Promise<ProjectsResponse> {
    try {
        const projects = await projectRepository.findProjects();
        return { status: 200, data: projects };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function createProject(formData: FormData): Promise<ProjectResponse> {
    try {
        if (!await isGranted(ALLOWED_ROLES)) {
            return { status: 401, message: "You are not authorized to create a project" };
        }

        const newProject = await parseAndValidateProject(formData);
        const createdProject = await projectRepository.createProject(newProject as NewProject);
        return { status: 201, data: createdProject };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function updateProject(projectId: number, formData: FormData): Promise<ProjectResponse> {
    try {
        if (!await isGranted(ALLOWED_ROLES)) {
            return { status: 401, message: "You are not authorized to update the project" };
        }

        const projectToUpdate: ProjectUpdate = await parseAndValidateProject(formData, "update");
        const updatedProject = await projectRepository.updateProject(projectId, projectToUpdate);
        return { status: 200, data: updatedProject };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function deleteProject(projectId: number): Promise<ProjectResponse> {
    try {
        if (!await isGranted(ALLOWED_ROLES)) {
            return { status: 401, message: "You are not authorized to delete the project" };
        }

        const deletedProject = await projectRepository.deleteProject(projectId);
        return { status: 200, data: deletedProject };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}


async function parseAndValidateProject(formData: FormData, action: "create" | "update" = "create"): Promise<NewProject | ProjectUpdate> {
    const imageString = formData.get("image") as string;
    const image = imageString.startsWith("data:image/") ? await handleBase64Image(imageString) : imageString;

    const projectData: NewProject | ProjectUpdate = {
        name: formData.get("name") as string,
        ticker: formData.get("ticker") as string,
        image,
        description: formData.get("description") as string,
        initialMarketCap: formData.get("initialMarketCap") as string,
        initialSupply: formData.get("initialSupply") as string,
        userId: Number(formData.get("userId")),
    };

    if (action === "update") {
        (projectData as ProjectUpdate).status = formData.get("status") as string;
    }

    const validateField = action === "create" ?
        createProjectSchema.safeParse(projectData) : updateProjectSchema.safeParse(projectData);

    if (!validateField.success) {
        throw new Error(validateField.error.errors[0].message);
    }

    return projectData;
}