"use server";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { EStatusCode, ICommonResponse } from "@/types";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
): Promise<ICommonResponse> => {
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      code: EStatusCode.BAD_REQUEST,
      type: "error",
      success: false,
      message: "无效的字段，请检查所有字段的格式",
    };
  }
  if (!token) {
    return {
      code: EStatusCode.FORBIDDEN,
      type: "error",
      success: false,
      message: "Token不存在",
    };
  }
  const { password } = validatedFields.data;
  const existingToken = await db.passwordResetToken.findUnique({
    where: {
      token,
    },
  });
  if (!existingToken) {
    return {
      code: EStatusCode.FORBIDDEN,
      type: "error",
      success: false,
      message: "Token不存在",
    };
  }
  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken?.email,
    },
  });
  if (!existingUser) {
    return {
      code: EStatusCode.FORBIDDEN,
      type: "error",
      success: false,
      message: "用户不存在",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // 更新密码
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  // 修改后删除此token
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return {
    code: EStatusCode.OK,
    type: "success",
    success: true,
    message: "密码重置成功, 正在重定向...",
  };
};
