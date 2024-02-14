"use server";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { EStatusCode, ICommonResponse } from "@/types";
import * as z from "zod";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.invalid_field,
      };
    }
    if (!token) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: dictionary.token_doesnt_exist,
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
        message: dictionary.token_doesnt_exist,
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
        message: dictionary.user_doesnt_exist,
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
      message: dictionary.new_password_success,
    };
  } catch (error) {
    console.log("Internal error in new-password", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
