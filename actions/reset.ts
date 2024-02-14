"use server";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { EStatusCode, ICommonResponse } from "@/types";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { getResponseDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";

// 忘记密码时的重置密码操作
export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<ICommonResponse> => {
  const dictionary = await getResponseDictionary(getLocaleFromUrl());
  try {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "无效的字段，请检查所有字段的格式",
      };
    }
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    // 用户不存在
    if (!existingUser) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: dictionary.user_doesnt_exist,
      };
    }
    const passwordResetToken = await generatePasswordResetToken(email);

    const { error } = await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
      existingUser.name!
    );

    if (error) {
      return {
        code: EStatusCode.INTERNAL_SERVER_ERROR,
        type: "error",
        success: false,
        message: dictionary.reset_send_email,
      };
    }

    return {
      code: EStatusCode.OK,
      type: "success",
      success: true,
      message: dictionary.reset_send_email,
    };
  } catch (error) {
    console.log("Internal error in reset", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: dictionary.internal_error,
    };
  }
};
