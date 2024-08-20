'use client';

import {ProfileTabs} from "@/components/profile-tab";
import {ProfileDetails} from "@/components/profile-detail";
import {useEffect, useState} from "react";
import {getUser} from "@/app/actions/user";
import {User} from "@/db/types/user-table";
import {useParams} from "next/navigation";

export default function ProfilePage() {
    const params = useParams()
    const wallet = params.wallet;

    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        if (!wallet) {
            return;
        }

        async function fetchUser(wallet: string) {
            try {
                const {data} = await getUser(wallet as string);
                if (data)
                    setProfile(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchUser(wallet as string);
    }, [setProfile, wallet])

    return (
        <section className="flex flex-col items-center h-full w-full py-4 gap-4">
            <div className="container mx-auto">
                {profile &&
                    <div
                        className="p-8 md:max-w-lg md:mx-auto flex flex-col justify-between gap-4 bg-[#8686861a] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-none">
                        <ProfileDetails profile={profile} setProfile={setProfile}/>
                        <ProfileTabs profile={profile}/>
                    </div>
                }
            </div>
        </section>
    );
}