"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { EStatusCode, ICommonResponse } from "@/types";
import * as z from "zod";
import { AuthError } from "next-auth";
export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<ICommonResponse> => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "无效的字段，请检查所有字段的格式",
      };
    }
    const { email, password } = validatedFields.data;
    return await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
