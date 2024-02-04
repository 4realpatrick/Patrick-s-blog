"use server";
import { UpdateSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserById } from "@/data/user";
export const updateProfile = async (
  values: z.infer<typeof UpdateSchema>,
  id: string
): Promise<ICommonResponse> => {
  try {
    const validatedFields = UpdateSchema.safeParse(values);
    // 检查字段是否符合要求，如不符合，有可能是恶意攻击
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "无效的字段，请检查所有字段的格式",
      };
    }
    const { password, name } = validatedFields.data;

    const user = await getUserById(id);
    if (!user) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "用户不存在",
      };
    }
    const data: {
      name: string;
      password?: string;
    } = {
      name,
    };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await db.user.update({
      where: {
        id,
      },
      data,
    });
    if (password) {
      return {
        code: EStatusCode.OK,
        type: "success",
        success: true,
        message: "修改成功，由于您修改了密码，需要重新登录",
      };
    }
    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: "修改成功",
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
