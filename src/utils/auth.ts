import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {  
    enabled: true,
  },
  plugins: [nextCookies()],
} satisfies BetterAuthOptions);