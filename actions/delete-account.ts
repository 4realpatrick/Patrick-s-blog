"use server";

import { getUserByName } from "@/data/user";
import { db } from "@/lib/db";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
import { EStatusCode, ICommonResponse } from "@/types";

export const deleteAccount = async (name: string): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    if (!name) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: dictionary.delete_account_username_required,
      };
    }
    const existingUser = await getUserByName(name);
    if (!existingUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: dictionary.user_doesnt_exist,
      };
    }
    const deletedUser = await db.user.delete({
      where: {
        id: existingUser.id,
      },
    });
    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.delete_account_success,
    };
  } catch (error) {
    console.log("Internal error in delete-account", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
