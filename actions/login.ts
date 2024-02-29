"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { EStatusCode, ICommonResponse } from "@/types";
import * as z from "zod";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<ICommonResponse> => {
  const locale = getLocaleFromUrl();
  const dictionary = await getResponseDictionary(locale);
  try {
    const validatedFields = LoginSchema.safeParse(values);
    // 检查字段是否符合要求，如不符合，有可能是恶意攻击
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.invalid_field,
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
        message: dictionary.login_user_doesnt_exist,
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
        return {
          code: EStatusCode.INTERNAL_SERVER_ERROR,
          type: "error",
          success: false,
          message: dictionary.reset_send_email,
        };
      }
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: dictionary.login_send_email,
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
            message: dictionary.login_credential_error,
          };
        case "OAuthAccountNotLinked":
          return {
            code: EStatusCode.BAD_REQUEST,
            type: "error",
            success: false,
            message: dictionary.login_OAuthAccountNotLinked,
          };
        case "CallbackRouteError":
          return {
            code: EStatusCode.BAD_REQUEST,
            type: "error",
            success: false,
            message: error.cause?.err?.message!,
          };
        default:
          return {
            code: EStatusCode.INTERNAL_SERVER_ERROR,
            type: "error",
            success: false,
            message: dictionary.internal_error,
          };
      }
    }
    // @ts-ignore
    if (error?.message === "NEXT_REDIRECT") {
      return redirect(`/${locale}${DEFAULT_LOGIN_REDIRECT}`);
    }
    console.log("Internal error in login", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
