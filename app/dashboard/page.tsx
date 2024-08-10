import { getServerSession } from "next-auth";
import { ProfileCard } from "../components/Profile";
import { authconfig } from "../lib/auth";
import db from "@/app/db";

async function getUserWallet(){
    const session = await getServerSession(authconfig);
    const userWallet = await db.solwallet.findFirst({
        where:{
            userid: session?.user?.uid
        },
        select:{
            publickey:true
        }
    })
    if(!userWallet){
        return {
            error:"User wallet not found"
            
        };
    }
    return {userWallet};

}

export default async function Dashboard() {
    const userWallet = await getUserWallet();
    if (userWallet.error || !userWallet.userWallet?.publickey) {
        return <>No solana wallet found</>;
    }
    


    return(
        <div className="">
            <ProfileCard publickey={userWallet.userWallet.publickey}/>
        </div>
    )
}