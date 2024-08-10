import { TokenDetails } from "@/app/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TokenWithbalance extends TokenDetails {
    balance: string;
    usdBalance: string;
}

export function useTokens(address: string) {
    const [tokenBalances, setTokenBalances] = useState<{
        totalBalance: number;
        tokens: TokenWithbalance[];
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // To track errors

    useEffect(() => {
        const fetchTokenBalances = async () => {
            try {
                const response = await axios.get(`/api/tokens?address=${address}`);
                setTokenBalances(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching token balances:', err);
                setError('Failed to fetch token balances.'); // Set error message
                setLoading(false); // Ensure loading is set to false on error
            }
        };

        fetchTokenBalances();
    }, []); // Add address to dependency array

    return {
        loading,
        tokenBalances,
        error // Return error state
    };
}
