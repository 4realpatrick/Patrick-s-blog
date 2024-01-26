import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// 因为nextjs在hotreload的时候new PrismaClient会调用多次，如果不想调用多次，则缓存一下，第一次实例化，后面则使用globalThis中的prisma
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
