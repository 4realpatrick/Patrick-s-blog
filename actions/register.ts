"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserByEmail, getUserByName } from "@/data/user";
export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<ICommonResponse> => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

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
    if (existingEmailUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: "该邮箱已被占用",
      };
    }
    const existingNameUser = await getUserByName(name);
    if (existingNameUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: "该用户名已被占用",
      };
    }
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: "用户创建成功",
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
