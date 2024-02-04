"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { EStatusCode, ICommonResponse } from "@/types";
import * as z from "zod";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { Locale } from "@/i18n.config";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  locale: Locale
): Promise<ICommonResponse> => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    // 检查字段是否符合要求，如不符合，有可能是恶意攻击
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "无效的字段，请检查所有字段的格式",
      };
    }
    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    // 查看是否有用户
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: "用户不存在，请检查字段是否正确",
      };
    }
    // 在用户没有激活邮箱时阻止登录
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      // 发送邮件
      const { error } = await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        existingUser.name!
      );

      if (error) {
        throw Error(error?.message);
      }
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: "我们向您的邮箱发送了一封激活邮件，请先激活邮箱",
      };
    }

    return await signIn("credentials", {
      email,
      password,
      redirectTo: `/${locale}${DEFAULT_LOGIN_REDIRECT}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: EStatusCode.BAD_REQUEST,
            type: "error",
            success: false,
            message: "无效的凭证，请检查用户名和密码",
          };
        default:
          return {
            code: EStatusCode.INTERNAL_SERVER_ERROR,
            type: "error",
            success: false,
            message: error.cause?.err?.message ?? "服务器内部错误",
          };
      }
    }
    throw error;
  }
};
