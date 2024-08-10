
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import db  from "@/app/db"
import { Keypair } from "@solana/web3.js";
import { Session } from "next-auth";

export interface session extends Session{
    user:{
        email: string;
        name: string;
        image: string
        uid: string;    
    }
}

export const authconfig ={
    
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks:{
        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              // @ts-ignore
              newSession.user.uid = token.uid ?? "";
            }
            return newSession!;
        },
        async jwt({ token, account, profile }: any) {
            const user = await db.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })
            if (user) {
              token.uid = user.id
            }
            return token
        },
        
        async signIn({user,account,profile,email,credentials}:any){
            if(account?.provider === 'google'){
                const email = user.email;
                if(!email){
                    return false;
                }
                const userDB = await db.user.findFirst({
                    where:{
                        username: email
                    }
                })
                if(userDB){
                    console.log(user,account,profile,email,credentials)
                    return true;
                }

                const keypair = Keypair.generate();
                const publickey = keypair.publicKey.toBase58();
                const privatekey = keypair.secretKey;

                console.log(publickey,privatekey);  


                await db.user.create({
                    data:{
                        username:email,
                        name:user?.name,
                        Picture:user?.image,
                        provider:'Google',
                        sub: account?.providerAccountId,    
                        solwallet:{
                            create:{
                                publickey:publickey,
                                privatekey:privatekey.toString()

                            }
                        },
                        inrwallet:{
                            create:{
                                balance:0
                            }
                        }
                    }
                })
                return true;
            }
            return false;
        }
    }
  
}