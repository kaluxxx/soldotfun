'use client';
import {useState} from 'react';
import Image from "next/image";
import profileImage from "@/assets/images/profile-image.png";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

const formSchema = z.object({
    profileImage: z.string().url(),
    username: z.string().min(2).max(50),
    bio: z.string().max(160),
});

export default function ProfilePage() {
    const [imageSrc, setImageSrc] = useState(profileImage);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            bio: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // @ts-ignore
                setImageSrc(reader.result as string);
                form.setValue("profileImage", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <section className="flex-1 flex flex-col items-center h-full w-full p-8 py-2 gap-4">
            <section className="flex-1">
                <div
                    className="p-8 h-full w-full flex flex-col justify-between gap-4 bg-[#8686861a] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-none">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Image src={imageSrc} alt="Profile" className="w-16 h-16 rounded-full" width={64} height={64}/>
                        </div>
                        <input type="file" id="fileInput" className="hidden" accept="image/*"
                               onChange={handleImageChange}/>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-lg text-center">@johndoe</p>
                            <p className="text-sm text-center">0 followers</p>
                            <Dialog>
                                <DialogTrigger
                                    className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                    <div
                                        className="rounded-full text-sm bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary flex items-center gap-2 py-1 px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M5 12l14 0"/>
                                            <path d="M13 18l6 -6"/>
                                            <path d="M13 6l6 6"/>
                                        </svg>
                                        Edit Profile
                                    </div>
                                </DialogTrigger>
                                <DialogContent
                                    className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                    <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)}
                                                  className="bg-background rounded-md p-4 flex flex-col gap-4">
                                                <h2 className="text-xl text-center">Edit Profile</h2>
                                                <FormField
                                                    control={form.control}
                                                    name="profileImage"
                                                    render={({field}) => (
                                                        <FormItem className="relative">
                                                            <FormLabel>Profile Image</FormLabel>
                                                            <div className="relative">
                                                                <Image src={imageSrc} alt="Profile"
                                                                       className="w-16 h-16 rounded-full cursor-pointer"
                                                                       width={64} height={64}
                                                                       onClick={() => document.getElementById('fileInput')?.click()}/>
                                                                <div
                                                                    className="absolute bottom-0 left-10 w-5 h-5 text-gray-500 cursor-pointer"
                                                                    onClick={() => document.getElementById('fileInput')?.click()}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                         height="24" viewBox="0 0 24 24"
                                                                         fill="none" stroke="currentColor"
                                                                         strokeWidth="2" strokeLinecap="round"
                                                                         strokeLinejoin="round"
                                                                         className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                                                                        <path stroke="none" d="M0 0h24v24H0z"
                                                                              fill="none"/>
                                                                        <path
                                                                            d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"/>
                                                                        <path d="M13.5 6.5l4 4"/>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <FormControl>
                                                                <input type="file" id="fileInput" className="hidden"
                                                                       accept="image/*"
                                                                       onChange={handleImageChange}/>
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
                                                                    placeholder="I am a developer..." {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex">
                                                    <div
                                                        className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                                        <div
                                                            className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                                            <Button type="submit"
                                                                    className="bg-background rounded-md hover:bg-gradient-to-b from-cyan via-blue to-primary">
                                                                Submit
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </Form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                            <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md">
                                <div className="bg-background rounded-md px-4 py-2">
                                    AzEV2swUFst5MvbveCB1FGLMWUjN3L4tyjRgZ37bbSNh
                                </div>
                            </div>
                        </div>
                        <a href="/https://solscan.io/account/AzEV2swUFst5MvbveCB1FGLMWUjN3L4tyjRgZ37bbSNh"
                           className="text-sm text-white underline self-end">
                            View on Solscan ↗
                        </a>
                    </div>
                    <Tabs defaultValue="coinCreated" className="w-full bg-transparent">
                        <TabsList className="flex gap-4">
                            <TabsTrigger value="coinCreated">Coins created</TabsTrigger>
                            <TabsTrigger value="followers">Followers</TabsTrigger>
                            <TabsTrigger value="following">Following</TabsTrigger>
                        </TabsList>
                        <TabsContent value="coinCreated">Make changes to your account here.</TabsContent>
                        <TabsContent value="followers">Make changes to your account here.</TabsContent>
                        <TabsContent value="following">Change your password here.</TabsContent>
                    </Tabs>
                </div>
            </section>
        </section>
    );
}