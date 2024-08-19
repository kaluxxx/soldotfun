import AutoForm, {AutoFormSubmit} from "@/components/ui/auto-form";
import {projectSchema} from "@/schema/project-schema";
import {AutoFormInputComponentProps} from "@/components/ui/auto-form/types";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormControl} from "@/components/ui/form";
import FieldWrapper from "@/components/field-wrapper";
import {useEffect, useState} from "react";
import {getUsers} from "@/app/actions/user";
import {z} from "zod";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {createProject} from "@/app/actions/project";
import toast from "react-hot-toast";
import {useUser} from "@/store/useUser";
import {useProject} from "@/store/useProject";

interface ProjectFormProps {
    setIsFormOpen: (value: boolean) => void;
}

export default function ProjectForm({setIsFormOpen}: ProjectFormProps) {
    const {users, setUsers} = useUser();
    const {project} = useProject();
    const [defaultValues, setDefaultValues] = useState<z.infer<typeof projectSchema> | undefined>(undefined);


    const handleFieldValue = (value: string, field: ControllerRenderProps<FieldValues, any>) => {
        const user = JSON.parse(value);
        field.onChange(user.id);
    }

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("ticker", values.ticker);
        formData.append("image", values.image);
        formData.append("description", values.description);
        formData.append("initialMarketCap", values.initialMarketCap);
        formData.append("initialSupply", values.initialSupply);
        formData.append("userId", values.userId.toString());

        try {
            const response = await createProject(formData);

            if (!response) return;

            setIsFormOpen(false);
            toast.success("Project created successfully.");
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            const users = await getUsers();

            if (!users) return;

            setUsers(users);
        }

        fetchInitialData();
    }, [setUsers]);

    useEffect(() => {
        if (project) {
            setDefaultValues({
                name: project.name,
                ticker: project.ticker,
                image: project.image,
                description: project.description,
                initialMarketCap: project.initialMarketCap,
                initialSupply: project.initialSupply,
                userId: project.user?.id!,
            });
        }
        
    }, [project, users]);

    return (
        <>
            <div className="flex justify-between items-center w-3/5 mx-auto">
                <h1 className="text-2xl font-bold">
                    {project ? "Edit Project" : "Create Project"}
                </h1>
                <button
                    onClick={() => setIsFormOpen(false)}
                    className="bg-accent text-accent-foreground px-4 py-2 rounded-md"
                >
                    Back
                </button>
            </div>
            <p className="text-foreground">{project ? "Edit" : "Create"} your project here</p>
            <div className="w-3/5 mx-auto">
                <AutoForm
                    formSchema={projectSchema}
                    values={defaultValues}
                    onSubmit={onSubmit}
                    fieldConfig={{
                        userId: {
                            fieldType: ({
                                            field,
                                            fieldProps,
                                        }: AutoFormInputComponentProps) => (
                                <>
                                    <Label>
                                        Dev
                                    </Label>
                                    <Select
                                        onValueChange={(value) => handleFieldValue(value, field)}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <FormControl>
                                                <SelectValue
                                                    placeholder="Select a dev"
                                                    {...fieldProps}
                                                />
                                            </FormControl>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users?.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={JSON.stringify(user)}
                                                    textValue={user.username}
                                                >
                                                    {user.username}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </>
                            ),
                            renderParent: ({children}) => (
                                <FieldWrapper className="col-span-2">
                                    {children}
                                </FieldWrapper>
                            ),
                        },
                        name: {
                            renderParent: ({children}) => (
                                <FieldWrapper>
                                    {children}
                                </FieldWrapper>
                            ),
                        },
                        ticker: {
                            renderParent: ({children}) => (
                                <FieldWrapper>
                                    {children}
                                </FieldWrapper>
                            ),
                        },
                        image: {
                            fieldType: "file",
                            renderParent: ({children}) => (
                                <FieldWrapper className="col-span-2">
                                    {children}
                                </FieldWrapper>
                            ),
                        },
                        description: {
                            fieldType: "textarea",
                            renderParent: ({children}) => (
                                <FieldWrapper className="col-span-2">
                                    {children}
                                </FieldWrapper>
                            ),
                        },
                    }}
                >
                    <AutoFormSubmit>
                        Create Project
                    </AutoFormSubmit>
                </AutoForm>
            </div>
        </>
    )
}