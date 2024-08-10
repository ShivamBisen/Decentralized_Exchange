'use client';

import { signIn, useSession } from "next-auth/react";
import { SecondryButton } from "../button";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <div className=" flex flex-col justify-center text-center gap-3">
            <h1 className="text-5xl font-bold  ">
                The crypto of tomorrow, <span className="text-blue-400">today</span>
            </h1>
            <p className="text-lg">Create a frictionless wallet with just a Google Account.</p>
            {session.data?.user? <SecondryButton prefix={''} onClick={()=>{router.push("/dashboard")}}>
                Go to Dashboard
            </SecondryButton> : <SecondryButton prefix={''} onClick={()=>{signIn()}}>
                Login with Google
            </SecondryButton> }
            
        </div>
    )
}