import {useEffect, useState} from "react";
import {deleteProject, getProject, getProjects} from "@/app/actions/project";
import ListView from "@/components/list-view";
import {columns} from "@/app/admin/projects/columns";
import toast from "react-hot-toast";
import {useProject} from "@/store/useProject";
import {handleResponse} from "@/utils/notification";

interface ProjectListProps {
    setIsFormOpen: (value: boolean) => void;
}

export default function ProjectList({setIsFormOpen}: ProjectListProps) {
    const {projects, setProjects, setProject} = useProject();
    const [filteredColumn, setFilteredColumn] = useState<string>("name");

    useEffect(() => {
        const fetchInitialData = async () => {
            const {data} = await getProjects();

            if (!data) return;

            setProjects(data);
        }

        fetchInitialData();
    }, [setProjects]);

    const handleDelete = async (projectId: number) => {
        if (!projects) return;
        const previousProjects = [...projects];
        setProjects(projects.filter(project => project.id !== projectId));

        try {
            const response = await deleteProject(projectId);
            handleResponse(response);

            if (response?.status !== 200) {
                setProjects(previousProjects);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleEdit = async (projectId: number) => {
        const response = await getProject(projectId);
        if (response?.status === 200 && response.data) {
            setProject(response.data);
            setIsFormOpen(true);
        }
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