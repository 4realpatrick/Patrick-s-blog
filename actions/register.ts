"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserByEmail, getUserByName } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<ICommonResponse> => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    // 检查字段是否符合要求，如不符合，有可能是恶意攻击
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "无效的字段，请检查所有字段的格式",
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
        message: "该邮箱已被占用",
      };
    }
    const existingNameUser = await getUserByName(name);
    // 检查是否有相同用户名注册
    if (existingNameUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: "该用户名已被占用",
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
      throw Error(error?.message);
    }
    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: "我们向您的邮箱发送了一封激活邮件，请先激活邮箱",
    };
  } catch (error) {
    console.log("Internal error in register", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: "服务器内部错误",
    };
  }
};
