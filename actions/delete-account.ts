"use server";

import { getUserByName } from "@/data/user";
import { db } from "@/lib/db";
import { getLocale } from "@/lib/get-locale";
import { EStatusCode, ICommonResponse } from "@/types";

export const deleteAccount = async (name: string): Promise<ICommonResponse> => {
  const locale = getLocale();
  if (!name) {
    return {
      code: EStatusCode.FORBIDDEN,
      type: "error",
      success: false,
      message: "用户名必填",
    };
  }
  const existingUser = await getUserByName(name);
  if (!existingUser) {
    return {
      code: EStatusCode.FORBIDDEN,
      type: "error",
      success: false,
      message: "用户不存在",
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
    message: "删除成功",
  };
};
