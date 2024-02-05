"use server";
import { db } from "@/lib/db";
import { ICommonResponse, EStatusCode } from "@/types";
import { getUserById } from "@/data/user";

export const updateAvatar = async (
  avatar: string,
  id: string
): Promise<ICommonResponse> => {
  try {
    if (!avatar || typeof avatar !== "string") {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "无效的字段，请检查所有字段的格式",
      };
    }

    const user = await getUserById(id);
    if (!user) {
      return {
        code: EStatusCode.BAD_REQUEST,
        type: "error",
        success: false,
        message: "用户不存在",
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
      message: "头像更新成功",
    };
  } catch (error) {
    console.log("Internal error in upload-avatar", error);
    return {
      code: EStatusCode.INTERNAL_SERVER_ERROR,
      type: "error",
      success: false,
      message: "服务器内部错误",
    };
  }
};
