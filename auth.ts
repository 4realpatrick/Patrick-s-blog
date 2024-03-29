import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { Role } from "@prisma/client";

// https://authjs.dev/guides/upgrade-to-v5#edge-compatibility

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // 使用除credentials以外的provider都不阻止
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      // 阻止未激活邮箱的用户登录
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.picture) {
        session.user.image = token.picture;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token, trigger }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      // 个人资料修改后update session
      if (trigger === "update") {
        token.name = existingUser.name;
        token.picture = existingUser.image;
      }
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
