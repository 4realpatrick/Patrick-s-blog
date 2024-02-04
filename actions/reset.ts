"use server";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { EStatusCode, ICommonResponse } from "@/types";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<ICommonResponse> => {
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
      message: "用户不存在",
    };
  }
  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
    existingUser.name!
  );

  return {
    code: EStatusCode.OK,
    type: "success",
    success: true,
    message: "我们向您的邮箱发送了一封重置邮件，请查收",
  };
};
