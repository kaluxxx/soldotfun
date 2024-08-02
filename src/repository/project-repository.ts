import {db} from "@/db/database";
import {NewProject, Project, ProjectUpdate} from "@/db/types/project-table";
import {jsonObjectFrom} from "kysely/helpers/postgres";
import {Expression} from "kysely";

function selectUserFields(userId: Expression<number>) {
    return jsonObjectFrom(
        db.selectFrom('user')
            .select(['id', 'username', 'wallet'])
            .whereRef('user.id', '=', userId)
    )
}

async function findProjectById(id: number): Promise<Project | undefined> {
    return await db.selectFrom('project')
        .where('id', '=', id)
        .selectAll()
        .select(({ref}) => [
            selectUserFields(ref('project.userId')).as('user')
        ])
        .executeTakeFirst();
}

async function findProjectsByUser(userId: number): Promise<Project[] | undefined> {
    return await db.selectFrom('project')
        .where('userId', '=', userId)
        .selectAll()
        .select(({ref}) => [
            selectUserFields(ref('project.userId')).as('user')
        ])
        .execute();
}

async function findProjects(): Promise<Project[] | undefined> {
    return await db.selectFrom('project')
        .selectAll()
        .select((eb) => [
            selectUserFields(eb.ref('project.userId')).as('user')
        ])
        .execute();
}

async function createProject(project: NewProject): Promise<Project | undefined> {
    const insertedProject = await db.insertInto('project')
        .values(project)
        .returningAll()
        .executeTakeFirst();

    return await findProjectById(insertedProject!.id);

}

async function updateProject(id: number, updateWith: ProjectUpdate): Promise<Project> {
    await db.updateTable('project').set(updateWith).where('id', '=', id).execute()
    const updatedProject = await findProjectById(id);
    return updatedProject!;
}

async function deleteProject(id: number): Promise<Project | undefined> {
    const projectToDelete = await findProjectById(id);
    await db.deleteFrom('project').where('id', '=', id).execute();

    return projectToDelete;
}

export const projectRepository = {
    findProjectById,
    findProjectsByUser,
    findProjects,
    createProject,
    updateProject,
    deleteProject
}