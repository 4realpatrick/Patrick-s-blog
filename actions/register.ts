"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserByEmail, getUserByName } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    // 检查字段是否符合要求，如不符合，有可能是恶意攻击
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.invalid_field,
      };
    }
    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmailUser = await getUserByEmail(email);
    // 检查是否已有相同邮箱注册
    if (existingEmailUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: dictionary.register_email_occupied,
      };
    }
    const existingNameUser = await getUserByName(name);
    // 检查是否有相同用户名注册
    if (existingNameUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: dictionary.register_username_occupied,
      };
    }
    // 创建用户
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 创建激活邮箱token
    const verificationToken = await generateVerificationToken(email);

    // 发送邮件
    const { error } = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      name
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
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.register_send_email,
    };
  } catch (error) {
    console.log("Internal error in register", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
