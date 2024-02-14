"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
import { EStatusCode, ICommonResponse } from "@/types";

export const newVerification = async (
  token: string
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      // token不存在
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.token_doesnt_exist,
      };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();

    // token过期
    if (hasExpired) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: dictionary.token_expired,
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    // 在这期间不知道通过什么方式更改了他的邮箱(maybe hacker)
    if (!existingUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: dictionary.new_verification_email_doesnt_exist,
      };
    }

    // 已经激活的邮箱
    if (existingUser.emailVerified) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: dictionary.new_verification_repeat_verify,
      };
    }

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    // 激活后删除verification token
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.new_verification_success,
    };
  } catch (error) {
    console.log("Internal error in new-verification", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
