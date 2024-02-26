import { Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
type ExtendedUser = DefaultSession["user"] & {
  role: Role;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
