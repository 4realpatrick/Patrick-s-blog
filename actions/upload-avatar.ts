"use server";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserById } from "@/data/user";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";

export const updateAvatar = async (
  avatar: string,
  id: string
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    if (!avatar || typeof avatar !== "string") {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.invalid_field,
      };
    }

    const user = await getUserById(id);
    if (!user) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.user_doesnt_exist,
      };
    }

    await db.user.update({
      where: {
        id,
      },
      data: {
        image: avatar,
      },
    });

    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.update_avatar_success,
    };
  } catch (error) {
    console.log("Internal error in upload-avatar", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
