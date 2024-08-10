import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED: number | null = null;
let prices: { [key: string]: { price: string } } = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;

export interface TokenDetails {
    
        name: string;
        mint: string;
        native: boolean;
        price: string;
        image: string;
    
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
    {
        name: "USDC",
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        native: false,
        price: "1",
        image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
    },
    {
        name: "USDT",
        mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        native: false,
        price: "1",
        image:"https://cryptologos.cc/logos/tether-usdt-logo.png"
    },
    {
        name: "SOL",
        mint: 'So11111111111111111111111111111111111111112',
        native: true,
        price: "1",
        image: "https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png"
    }
];

export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/sleiRD8-KgsQ_uHYmWkD095z6E8wmSaP");

export async function getSupportedTokens() {
    const now = new Date().getTime();

    // Fetch new prices if they haven't been updated or the interval has passed
    if (!LAST_UPDATED || now - LAST_UPDATED > TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
            prices = response.data.data;
            LAST_UPDATED = now;
        } catch (e) {
            console.error(e);
        }
    }

    // Return the updated tokens with their current prices
    return SUPPORTED_TOKENS.map(s => ({
        ...s,
        price: prices[s.name]?.price || s.price // Fallback to the default price if API data is unavailable
    }));
}
