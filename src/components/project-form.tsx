import AutoForm, {AutoFormSubmit} from "@/components/ui/auto-form";
import {createProjectSchema, CreateProjectType, updateProjectSchema, UpdateProjectType} from "@/schema/project-schema";
import {AutoFormInputComponentProps} from "@/components/ui/auto-form/types";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormControl} from "@/components/ui/form";
import FieldWrapper from "@/components/field-wrapper";
import {useEffect, useState} from "react";
import {getUsers} from "@/app/actions/user";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {createProject, updateProject} from "@/app/actions/project";
import {useUser} from "@/store/useUser";
import {useProject} from "@/store/useProject";
import {handleResponse} from "@/utils/notification";

interface ProjectFormProps {
    setIsFormOpen: (value: boolean) => void;
}

const statusOptions = [
    {value: "incoming", label: "Incoming"},
    {value: "live", label: "Live"},
];
export default function ProjectForm({setIsFormOpen}: ProjectFormProps) {
    const {users, setUsers} = useUser();
    const {project} = useProject();
    const [defaultValues, setDefaultValues] = useState<UpdateProjectType | undefined>(undefined);

    const handleFieldValue = ({value, key, field}: {
        value: string,
        key: string,
        field: ControllerRenderProps<FieldValues, any>
    }) => {
        const object = JSON.parse(value);
        field.onChange(object[key]);
    }

    const onSubmit = async (values: CreateProjectType | UpdateProjectType) => {
        console.log(values);
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("ticker", values.ticker);
        formData.append("image", values.image);
        formData.append("description", values.description);
        formData.append("initialMarketCap", values.initialMarketCap);
        formData.append("initialSupply", values.initialSupply);
        formData.append("userId", values.userId.toString());

        if (project && 'status' in values) {
            formData.append("status", values.status);
        }

        try {
            const response = project ? await updateProject(project.id, formData) : await createProject(formData);
            handleResponse(response);
            if (response?.status === 201 || response?.status === 200) {
                setIsFormOpen(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            const {data} = await getUsers();

            if (!data) return;

            setUsers(data);
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
                status: project.status!,
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
                    formSchema={project ? updateProjectSchema : createProjectSchema}
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
                                        onValueChange={(value) => handleFieldValue({value, key: "id", field})}
                                        defaultValue={users && defaultValues?.userId ?
                                            JSON.stringify(users.find(user => user.id === defaultValues.userId))
                                            : undefined
                                        }
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
                                <FieldWrapper className={`${project ? "col-span-1" : "col-span-2"}`}>
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
                        initialMarketCap: {
                            label: project ? "Market Cap" : "Initial Market Cap",
                            renderParent: ({children}) => (
                                <FieldWrapper>
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
                        ...(project && {
                            status: {
                                fieldType: ({
                                                field,
                                                fieldProps,
                                            }: AutoFormInputComponentProps) => (
                                    <>
                                        <Label>
                                            Status
                                        </Label>
                                        <Select
                                            onValueChange={(value) => handleFieldValue({value, key: "value", field})}
                                            defaultValue={JSON.stringify(statusOptions.find(status => status.value === defaultValues?.status))}
                                        >
                                            <SelectTrigger>
                                                <FormControl>
                                                    <SelectValue
                                                        placeholder="Select a status"
                                                        {...fieldProps}
                                                    />
                                                </FormControl>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions?.map((status, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={JSON.stringify(status)}
                                                        textValue={status.label}
                                                    >
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                ),
                                renderParent: ({children}) => (
                                    <FieldWrapper>
                                        {children}
                                    </FieldWrapper>
                                ),
                            },
                        }),
                    }}
                >
                    <AutoFormSubmit>
                        {project ? "Edit Project" : "Create Project"}
                    </AutoFormSubmit>
                </AutoForm>
            </div>
        </>
    )
}
