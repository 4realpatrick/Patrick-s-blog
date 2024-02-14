"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
import { EStatusCode, ICommonResponse } from "@/types";

export const newPasswordTokenCheck = async (
  token: string
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    if (!token) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.token_doesnt_exist,
      };
    }
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.token_doesnt_exist,
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      await db.passwordResetToken.delete({
        where: {
          token: existingToken.token,
        },
      });
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: dictionary.token_expired,
      };
    }
    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.new_password_token_check_success,
    };
  } catch (error) {
    console.log("Internal error in new-password-token-check", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
