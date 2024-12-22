"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const serverless_1 = require("@neondatabase/serverless");
const serverless_2 = require("@neondatabase/serverless");
const adapter_neon_1 = require("@prisma/adapter-neon");
const client_1 = require("@prisma/client");
serverless_1.neonConfig.useSecureWebSocket = true;
const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;
    const pool = new serverless_2.Pool({ connectionString });
    const adapter = new adapter_neon_1.PrismaNeon(pool);
    return new client_1.PrismaClient({
        adapter,
        log: ['error', 'warn'],
    });
};
const globalForPrisma = globalThis;
exports.db = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.db;
