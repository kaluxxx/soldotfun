import {useEffect, useState} from "react";
import {deleteProject, getProject, getProjects} from "@/app/actions/project";
import ListView from "@/components/list-view";
import {columns} from "@/app/admin/projects/columns";
import toast from "react-hot-toast";
import {useProject} from "@/store/useProject";

interface ProjectListProps {
    setIsFormOpen: (value: boolean) => void;
}

export default function ProjectList({setIsFormOpen}: ProjectListProps) {
    const {projects, setProjects, setProject} = useProject();
    const [filteredColumn, setFilteredColumn] = useState<string>("name");

    useEffect(() => {
        const fetchInitialData = async () => {
            const projects = await getProjects();

            if (!projects) return;

            setProjects(projects);
        }

        fetchInitialData();
    }, [setProjects]);

    const handleDelete = async (projectId: number) => {
        if (!projects) return;
        const previousProjects = [...projects];
        setProjects(projects.filter(project => project.id !== projectId));

        try {
            await deleteProject(projectId);
            toast.success("Project deleted successfully");
        } catch (e) {
            console.error(e);
            setProjects(previousProjects);
        }
    };

    const handleEdit = async (projectId: number) => {
        const project = await getProject(projectId);

        if (!project) return;

        setProject(project);
        setIsFormOpen(true);
    }

    const handleNewProject = () => {
        setIsFormOpen(true);
        setProject(null);
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-foreground">Manage your projects here</p>
            {projects && <ListView
                columns={columns(handleDelete, handleEdit)}
                data={projects}
                filteredColumn={filteredColumn}
                setFilteredColumn={setFilteredColumn}
                handleOpenForm={handleNewProject}
            />}
        </>
    )
}