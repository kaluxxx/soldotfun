import {User} from "@/db/types/user-table";
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {followUser, unfollowUser} from "@/app/actions/follow";
import {handleResponse} from "@/utils/notification";
import {useFollow} from "@/store/useFollow";
import {useEffect, useState} from "react";
import {useUser} from "@/store/useUser";
import Image from "next/image";
import {ProfileForm} from "@/components/profile-form";

interface ProfileDetailsProps {
    profile: User | null;
    setProfile: (profile: User) => void;
}
export function ProfileDetails({profile, setProfile}: ProfileDetailsProps) {
    const {followers, setFollowers} = useFollow();
    const {user} = useUser();
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>(profile?.image);

    async function updateFollow(userId: number, profileId: number) {
        const previousFollowers = [...followers!];
        let response;
        if (followers?.find(follower => follower.id === userId)) {
            setFollowers(followers?.filter(follower => follower.id !== userId));
            response = await unfollowUser(profileId, userId);

        } else {
            setFollowers(followers ? [...followers, user!] : [user!]);
            response = await followUser(profileId, userId);
        }
        handleResponse(response);
        if (response.status !== 200) {
            setFollowers(previousFollowers);
        }
    }

    useEffect(() => {
        if (!profile) {
            return;
        }

        setImageSrc(profile.image);
    }, [profile]);

    return (
       <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-row justify-between gap-4">
                <div className="relative self-center">
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                            width={64}
                            height={64}
                            priority={true}
                        />
                    )}
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg text-center">@{profile?.username}</p>
                    {followers && <p className="text-sm text-center">{followers?.length} followers</p>}
                    {profile?.id === user?.id && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger
                                className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                <div
                                    className="rounded-full text-sm bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary flex items-center gap-2 py-1 px-2">
                                    Edit Profile
                                </div>
                            </DialogTrigger>
                            <DialogContent
                                className="container bg-gradient-to-b from-cyan via-blue to-primary rounded-md p-px">
                                <ProfileForm
                                    profile={profile}
                                    setProfile={setProfile}
                                    imageSrc={imageSrc!}
                                    setImageSrc={setImageSrc}
                                    setOpen={setOpen}
                                />
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
                {user && profile?.wallet !== user.wallet && (
                    <div className="flex flex-col gap-2">
                        <Button onClick={() => updateFollow(user.id, profile!.id)}
                                className="bg-background rounded-full px-4 py-1 hover:bg-gradient-to-b from-cyan via-blue to-primary">
                            {followers?.find(follower => follower.id === user?.id) ? "Unfollow" : "Follow"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
