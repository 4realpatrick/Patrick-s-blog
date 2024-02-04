"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import { EStatusCode, ICommonResponse } from "@/types";

export const newPasswordTokenCheck = async (
  token: string
): Promise<ICommonResponse> => {
  if (!token) {
    return {
      code: EStatusCode.BAD_REQUEST,
      type: "error",
      success: false,
      message: "Token不存在",
    };
  }
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {
      code: EStatusCode.BAD_REQUEST,
      type: "error",
      success: false,
      message: "Token不存在",
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
      message: "Token已过期, 已删除该token, 请重新发送邮件",
    };
  }
  return {
    code: EStatusCode.OK,
    type: "success",
    success: true,
    message: "Token正确",
  };
};
