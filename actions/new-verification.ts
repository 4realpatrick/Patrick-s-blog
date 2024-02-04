"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { EStatusCode, ICommonResponse } from "@/types";

export const newVerification = async (
  token: string
): Promise<ICommonResponse> => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      // token不存在
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "Token不存在",
      };
    }
    const hasExpired = new Date(existingToken.token) < new Date();

    // token过期
    if (hasExpired) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: "Token已过期，请重新发送激活邮件",
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    // 在这期间不知道通过什么方式更改了他的邮箱(maybe hacker)
    if (!existingUser) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "error",
        success: false,
        message: "该token所属邮箱不存在",
      };
    }

    // 已经激活的邮箱
    if (existingUser.emailVerified) {
      return {
        code: EStatusCode.FORBIDDEN,
        type: "info",
        success: false,
        message: "该邮箱以激活，请勿重复操作",
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
      message: "邮箱激活成功，正在重定向...",
    };
  } catch (error) {
    console.log("Internal error in new-verification", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: "服务器内部错误",
    };
  }
};
