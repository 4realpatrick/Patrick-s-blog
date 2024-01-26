import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "邮箱格式有误，请确认输入的邮箱是否正确",
  }),
  password: z.string().min(1, {
    message: "请输入密码！",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "邮箱格式有误，请确认输入的邮箱是否正确",
  }),
  password: z.string().min(6, {
    message: "密码最少需要6位及其以上",
  }),
  name: z.string().min(3, {
    message: "用户名最少需要3位及其以上",
  }),
});
