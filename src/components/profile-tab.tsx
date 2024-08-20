import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FollowersList} from "@/components/follower-list";
import {getFollowersById, getFollowingById} from "@/app/actions/follow";
import {useFollow} from "@/store/useFollow";
import {useEffect} from "react";
import {User} from "@/db/types/user-table";

interface ProfileTabsProps {
    profile: User;
}

export function ProfileTabs({profile}: ProfileTabsProps) {
    const {followers, setFollowers, following, setFollowing} = useFollow();

    useEffect(() => {
        if (!profile) return;
        async function getFollowers(userId: number) {
            try {
                const {data} = await getFollowersById(userId);
                if (data)
                    setFollowers(data);
            } catch (e) {
                console.error(e);
            }
        }

        async function getFollowing(userId: number) {
            try {
                const {data} = await getFollowingById(userId);
                if (data)
                    setFollowing(data);
            } catch (e) {
                console.error(e);
            }
        }
        
        getFollowers(profile.id);
        getFollowing(profile.id);
    }, [setFollowers, setFollowing, profile]);

    return (
        <Tabs defaultValue="coinCreated" className="w-full bg-transparent">
            <TabsList className="flex flex-col md:flex-row gap-4 h-auto">
                <TabsTrigger value="coinCreated">Coins created</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="coinCreated">
                <p className="text-center">Here the Coins Created</p>
            </TabsContent>
            <TabsContent value="followers">
                {followers && <FollowersList followers={followers} following={false}/>}
            </TabsContent>
            <TabsContent value="following">
                {following && <FollowersList followers={following} following={true}/>}
            </TabsContent>
        </Tabs>
    );
}
