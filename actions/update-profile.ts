"use server";
import { UpdateSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserById } from "@/data/user";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
export const updateProfile = async (
  values: z.infer<typeof UpdateSchema>,
  id: string
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    const validatedFields = UpdateSchema.safeParse(values);
    // 检查字段是否符合要求，如不符合，有可能是恶意攻击
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.invalid_field,
      };
    }
    const { password, name } = validatedFields.data;

    const user = await getUserById(id);
    if (!user) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.user_doesnt_exist,
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
        message: dictionary.update_success_password,
      };
    }
    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.update_success,
    };
  } catch (error) {
    console.log("Internal error in update-profile", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
