import Link from "next/link";
import Image from "next/image";
import {Follower} from "@/types/entities/follower";

interface FollowersListProps {
    followers: Follower[];
    following: boolean;
}

export function FollowersList({followers, following}: FollowersListProps) {
    return (
        <div className="flex flex-col gap-2">
            {followers.length > 0 ? (
                followers.map(follower => (
                    <Link key={follower.id} className="flex items-center gap-2" href={`/profile/${follower.wallet}`}>
                        <Image src={follower.image} alt="Profile" className="w-10 h-10 rounded-full" width={40} height={40}/>
                        <p>@{follower.username}</p>
                    </Link>
                ))
            ) : (
                <p className="text-center">{following ? "Not following anyone yet." : "No followers yet."}</p>
            )}
        </div>
    );
}
