import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validateFields = await LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);
          if (!user) throw new Error("账号不存在");
          if (!user.password) return null;
          const passwordMatches = await bcrypt.compare(password, user.password);
          if (!passwordMatches) throw new Error("账号密码不匹配");
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
