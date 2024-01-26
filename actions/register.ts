"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    // return NextResponse.json("无效的字段", { status: 400 });
  }
  // return NextResponse.json("邮件已发送", { status: 200 });
};
