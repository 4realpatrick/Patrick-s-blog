"use server";
import { UpdateSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserById } from "@/data/user";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
import { auth } from "@/auth";
export const updateProfile = async (
  values: z.infer<typeof UpdateSchema>
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
    const { name } = validatedFields.data;
    const session = await auth();
    if (!session || !session.user) {
      return {
        code: EStatusCode.UNAUTHORIZED,
        type: "error",
        success: false,
        message: dictionary.unauthorized,
      };
    }
    const user = await getUserById(session.user.id!);
    if (!user) {
      return {
        code: EStatusCode.UNAUTHORIZED,
        type: "error",
        success: false,
        message: dictionary.unauthorized,
      };
    }
    const data: {
      name: string;
      password?: string;
    } = {
      name,
    };

    await db.user.update({
      where: {
        id: session.user.id!,
      },
      data,
    });
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
