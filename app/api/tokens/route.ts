import { NextRequest, NextResponse } from "next/server";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { SUPPORTED_TOKENS, connection, getSupportedTokens } from "@/app/lib/constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const address = searchParams.get("address");
        console.log("address", address);
        if (!address) {
            return NextResponse.json({ error: "Address query parameter is required" }, { status: 400 });
        }

        const supportedTokens = await getSupportedTokens();
        const balances = await Promise.all(supportedTokens.map(token => getAccountBalance(token, address)));
        console.log("balances", balances);

        const token =  supportedTokens.map((token, index) => ({
            ...token,
            balance: balances[index],
            usdBalance:balances[index]*Number(token.price),
            
        }))

        return NextResponse.json({
            token,
            totalBalance: token.reduce((acc, t) => acc + t.usdBalance, 0)
        });

    } catch (error) {
        console.error("Error in GET /api/tokens:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function getAccountBalance(
    token: { name: string; mint: string; native: boolean }, 
    address: string
): Promise<number> {
    try {
        if (token.native) {
            const balance = await connection.getBalance(new PublicKey(address));
            return balance / LAMPORTS_PER_SOL;
        }

        const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));
        const account = await getAccount(connection, ata);
        const mint = await getMint(connection, new PublicKey(token.mint));
        return Number(account.amount) / Math.pow(10, mint.decimals);

    } catch (e) {
        console.error(`Error fetching balance for token ${token.name}:`, e);
        return 0;
    }
}
