import { neonConfig } from "@neondatabase/serverless";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
neonConfig.useSecureWebSocket = true;
const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({
        adapter,
        log: ["error", "warn"],
    });
};
const globalForPrisma = globalThis;
// This exports everything from @prisma/client including all types, enums, and the Prisma namespace
export * from "@prisma/client";
export const db = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = db;
