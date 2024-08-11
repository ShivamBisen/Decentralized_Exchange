import { PrismaClient } from "@prisma/client";

// Function to create a new instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
}

// Type alias for the Prisma client instance
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Global object to store the Prisma client instance
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
}

// Create a single Prisma client instance or use the existing one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// In non-production environments, set the global Prisma instance
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
