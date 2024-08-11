'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import { CiWallet } from 'react-icons/ci';
import { QuaternaryButton, TertiaryButton } from '../button';
import { useEffect, useState } from 'react';
import { useTokens } from '@/app/api/hooks/useTokens';
import Image from 'next/image';

export const ProfileCard = ({ publickey }: { publickey: string }) => {
    const session = useSession();
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const { tokenBalances, loading } = useTokens(publickey);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
                console.log(tokenBalances);
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [copied]);

    if (session.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session.data?.user) {
        router.push('/');
        return <div>Redirecting...</div>;
    }

    // Format the balance or show loading message
    const formattedBalance = !loading
    ? parseFloat(tokenBalances?.totalBalance.toString() || "0").toFixed(2)
    : "Loading...";


    return (
        <div className='flex justify-center items-center h-screen self-center'>
            <div className="border-2 flex flex-col gap-6 p-10 rounded-lg max-w-[600px] w-[100%]">
                <Greeting
                    image={session.data?.user?.image ?? undefined}
                    name={session.data?.user?.name ?? undefined}
                />
                <div className="flex items-center gap-3">
                    <CiWallet />
                    <p className='text-lg'>Assets in your wallet</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex">
                        <h1 className='text-5xl'>
                           ${formattedBalance}
                        </h1>
                        <p>USD</p>
                    </div>
                    <div>
                        <QuaternaryButton
                            onClick={() => {
                                navigator.clipboard.writeText(publickey.toString());
                                setCopied(true);
                            }}
                        >
                            {copied ? "Copied" : "Your Wallet Address"}
                        </QuaternaryButton>
                    </div>
                </div>
                <div className="flex justify-between">
                    <TertiaryButton  onClick={() => { }} >Send</TertiaryButton>
                    <TertiaryButton  onClick={() => { }} >Add Funds</TertiaryButton>
                    <TertiaryButton  onClick={() => { }} >Withdraw</TertiaryButton>
                    <TertiaryButton  onClick={() => { }} >Swap</TertiaryButton>
                </div>
            </div>
        </div>
    );
};

function Greeting({ image, name }: { image?: string; name?: string }) {
    return (
        <div className="flex items-center gap-2">
           <img src={image} alt="profile" width={48} height={48} className="rounded-full" />
            <h1 className="text-3xl font-bold">Welcome Back, {name}!</h1>
        </div>
    );
}
