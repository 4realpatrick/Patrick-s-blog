import EmailTemplate from "@/components/email-template";
import ResetPasswordTemplate from "@/components/reset-password-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  username: string
) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "激活您的邮箱",
    text: "",
    react: EmailTemplate({ username, confirmLink }),
  });
  return { data, error };
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  username: string
) => {
  const confirmLink = `http://localhost:3000/new-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "重制您的密码",
    text: "",
    react: ResetPasswordTemplate({ username, confirmLink }),
  });
  return { data, error };
};
