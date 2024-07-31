'use client';
import {ChangeEvent, useEffect, useState} from 'react';
import Image from "next/image";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useUser} from "@/store/useUser";
import Link from "next/link";
import {Follower} from "@/types/entities/follower";
import {followUser, getFollowersById, getFollowingById, unfollowUser} from "@/app/actions/follow";
import {getUser, updateUser, uploadImage} from "@/app/actions/user";
import {userFormSchema} from "@/formSchema/user-form-schema";
import {useParams} from 'next/navigation';
import {User} from "@/types/entities/user";

export default function ProfilePage() {
    const params = useParams()
    const wallet = params.wallet;
    const {user} = useUser();
    const [profile, setProfile] = useState(null as User | null);
    const [open, setOpen] = useState(false);
    const [followers, setFollowers] = useState<Follower[] | null>(null);
    const [following, setFollowing] = useState<Follower[] | null>(null);
    const [imageSrc, setImageSrc] = useState("");

    const form = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            username: "",
            bio: "",
            profileImage: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof userFormSchema>) {
        if (!profile) {
            return;
        }
        const {username, bio, profileImage} = values;

        const updatedUser = await updateUser(profile!.id, {
            ...profile,
            username,
            bio,
        });

        if (updatedUser) {
            setProfile(updatedUser);
            setOpen(false);
        }
    }

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file || file.name === profile!.image) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
            form.setValue("profileImage", file);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("profileImage", file);
        const newImage = await uploadImage(profile!.id, formData);
        if (!newImage) {
            return;
        }
        setImageSrc("/uploads/" + newImage);
        setProfile({...profile!, image: newImage});
    }

    async function updateFollow(userId: number, profileId: number) {
        if (followers?.find(follower => follower.id === userId)) {
            await unfollowUser(profileId, userId);
            setFollowers(followers?.filter(follower => follower.id !== userId));
        } else {
            await followUser(profileId, userId);
            setFollowers(followers ? [...followers, user!] : [user!]);
        }
    }

    useEffect(() => {
        if (!wallet) {
            return;
        }
        async function fetchUser(wallet: string) {
            try {
                const user = await getUser(wallet as string);
                if (user)
                    setProfile(user);
                console.log(user);
            } catch (e) {
                console.error(e);
            }
        }
        fetchUser(wallet as string);
    }, [setProfile, wallet])

    useEffect(() => {
        if (!profile) {
            return;
        }

        async function getFollowers(userId: number) {
            try {
                const followers = await getFollowersById(userId);
                if (followers)
                    setFollowers(followers);
            } catch (e) {
                console.error(e);
            }
        }
        async function getFollowing(userId: number) {
            try {
                const following = await getFollowingById(userId);
                if (following)
                    setFollowing(following);
            } catch (e) {
                console.error(e);
            }
        }
        function updateForm(user: User) {
            form.setValue("username", user.username);
            form.setValue("bio", user.bio);
            setImageSrc("/uploads/" + user.image);
        }

        getFollowers(profile.id);
        getFollowing(profile.id);
        updateForm(profile);
    }, [form, profile]);

    return (
        <section className="flex flex-col items-center h-full w-full py-4 gap-4">
            <div className="container mx-auto">
                {profile && (
                    <div
                        className="p-8 md:max-w-lg md:mx-auto flex flex-col justify-between gap-4 bg-[#8686861a] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-none">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-row justify-between gap-4">
                                <div className="relative self-center">
                                    {imageSrc && (
                                        <Image src={imageSrc} alt="Profile" className="w-16 h-16 rounded-full"
                                               width={64}
                                               height={64}/>
                                    )}
                                </div>
                                <input type="file" id="fileInput" className="hidden" accept="image/*"
                                       onChange={handleImageChange}/>
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-lg text-center">{profile?.username}</p>
                                    <p className="text-sm text-center">{followers?.length} followers</p>
                                    {profile?.id === user?.id && (
                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger
                                                className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                                <div
                                                    className="rounded-full text-sm bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary flex items-center gap-2 py-1 px-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         strokeWidth="2"
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
                                                className="container bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                                <div
                                                    className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(onSubmit)}
                                                              className="bg-background rounded-md p-4 flex flex-col gap-4">
                                                            <DialogTitle className="text-xl text-center">Edit
                                                                Profile</DialogTitle>
                                                            <FormField
                                                                control={form.control}
                                                                name="profileImage"
                                                                render={({field}) => (
                                                                    <FormItem className="relative">
                                                                        <FormLabel>Profile Image</FormLabel>
                                                                        <div className="relative">
                                                                            <Image src={imageSrc}
                                                                                   alt="Profile"
                                                                                   className="w-16 h-16 rounded-full cursor-pointer"
                                                                                   width={64} height={64}
                                                                                   onClick={() => document.getElementById('fileInput')?.click()}/>
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
                                                                        </div>
                                                                        <FormControl>
                                                                            <input type="file" id="fileInput"
                                                                                   className="hidden"
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
                                                                                className="ring-offset-background"
                                                                                placeholder="I am a developer..." {...field}
                                                                                value={field.value || ""}
                                                                            />
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
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-row justify-between gap-4">
                                {profile?.bio && (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-lg">Bio</p>
                                        <p className="text-sm">{profile?.bio}</p>
                                    </div>
                                )}
                                {wallet !== user?.wallet && (
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                            <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full">
                                                <Button
                                                    onClick={() => updateFollow(user?.id!, profile?.id!)}
                                                    className="text-xs bg-background rounded-full px-4 py-1  break-words overflow-hidden hover:bg-gradient-to-b from-cyan via-blue to-primary">
                                                    {followers?.find(follower => follower.id === user?.id) ? "Unfollow" : "Follow"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-md">
                                    <div
                                        className="bg-background rounded-md px-4 py-2  break-words overflow-hidden">
                                        <p className="hidden md:block text-sm">{profile?.wallet}</p>
                                        <p className="md:hidden text-sm">{profile?.wallet.slice(0, 25)}...</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="https://solscan.io/account/AzEV2swUFst5MvbveCB1FGLMWUjN3L4tyjRgZ37bbSNh"
                                  className="text-sm text-white underline self-end"
                                  target="_blank" rel="noopener noreferrer"
                            >
                                View on Solscan ↗
                            </Link>
                        </div>
                        <Tabs defaultValue="coinCreated" className="w-full bg-transparent">
                            <TabsList className="flex flex-col md:flex-row gap-4 h-auto">
                                <TabsTrigger value="coinCreated">Coins created</TabsTrigger>
                                <TabsTrigger value="followers">Followers</TabsTrigger>
                                <TabsTrigger value="following">Following</TabsTrigger>
                            </TabsList>
                            <TabsContent value="coinCreated">Make changes to your account here.</TabsContent>
                            <TabsContent value="followers">
                                {followers && followers.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {followers.map((follower) => (
                                            <div key={follower.id} className="flex items-center gap-2">
                                                <div className="relative">
                                                    <Image src={follower.image} alt="Profile"
                                                           className="w-10 h-10 rounded-full"
                                                           width={40} height={40}/>
                                                </div>
                                                <p>{follower.username}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center">No followers yet.</p>
                                )}
                            </TabsContent>
                            <TabsContent value="following">
                                {following && following.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {following.map((follower) => (
                                            <div key={follower.id} className="flex items-center gap-2">
                                                <div className="relative">
                                                    <Image src={follower.image} alt="Profile"
                                                           className="w-10 h-10 rounded-full"
                                                           width={40} height={40}/>
                                                </div>
                                                <p>{follower.username}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center">Not following anyone yet.</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            </div>
        </section>
    );
}