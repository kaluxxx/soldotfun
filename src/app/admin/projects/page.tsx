'use client';

import {useState} from "react";
import ProjectForm from "@/components/project-form";
import ProjectList from "@/components/project-list";

export default function ProjectsPage() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    return (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-4">
            {!isFormOpen && (
               <ProjectList setIsFormOpen={setIsFormOpen} />
            )}
            {isFormOpen && (
                <ProjectForm setIsFormOpen={setIsFormOpen} />
            )}
        </div>
    );
}