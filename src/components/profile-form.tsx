import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@/db/types/user-table";
import {DialogTitle} from "@/components/ui/dialog";
import {userSchema} from "@/schema/user-schema";
import {ProfileImage} from "@/components/profile-image";
import {useEffect} from "react";
import {updateUser} from "@/app/actions/user";
import {handleResponse} from "@/utils/notification";

interface ProfileFormProps {
    profile: User | null;
    setProfile: (profile: User) => void;
    imageSrc: string;
    setImageSrc: (image: string) => void;
    setOpen: (value: boolean) => void;
}

export function ProfileForm({profile, imageSrc, setImageSrc, setProfile, setOpen}: ProfileFormProps) {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: profile?.username || "",
            bio: profile?.bio || "",
            image: profile?.image || "",
        },
    });

    useEffect(() => {
        if (!profile) {
            return;
        }

        function updateForm(user: User) {
            form.setValue("username", user.username);
            form.setValue("bio", user.bio);
            setImageSrc(user.image);
        }

        updateForm(profile);
    }, [form, profile, setImageSrc]);

    async function onSubmit(values: z.infer<typeof userSchema>) {
        if (!profile) {
            return;
        }

        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("bio", values.bio);
        formData.append("image", values.image ?? profile.image);

        const response = await updateUser(profile!.id, formData);

        handleResponse(response);

        if (response.data && response.status === 200) {
            setProfile(response.data);
            setOpen(false);
        }
    }

    async function handleImageChange(base64: string) {
        form.setValue("image", base64);
        setImageSrc(base64);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-background rounded-md p-4 flex flex-col gap-4">
                <DialogTitle className="text-xl text-center">Edit Profile</DialogTitle>
                <FormField
                    control={form.control}
                    name="image"
                    render={({field}) => (
                        <FormItem className="relative">
                            <FormLabel>Profile Image</FormLabel>
                            <ProfileImage
                                imageSrc={imageSrc}
                                onImageChange={handleImageChange}
                            />
                            <div
                                className="absolute bottom-0 left-10 w-5 h-5 text-gray-500 cursor-pointer"
                                onClick={() => document.getElementById('fileInput')?.click()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="24"
                                     height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="white"
                                     strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                                    <path stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"/>
                                    <path
                                        d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"/>
                                    <path d="M13.5 6.5l4 4"/>
                                </svg>
                            </div>
                            <FormControl>
                                <Input type="hidden" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="ring-offset-background"
                                    placeholder="I am a developer..." {...field}
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex w-full py-4">
                    <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px w-full">
                        <Button type="submit"
                                className="rounded-full text-sm bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary flex items-center gap-2 py-2 px-4 w-full">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
        ;
}
