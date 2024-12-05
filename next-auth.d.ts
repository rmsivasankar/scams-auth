import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserRole } from "@prisma/client"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
}

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
}