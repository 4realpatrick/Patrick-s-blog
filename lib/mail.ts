import EmailTemplate from "@/components/email-template";
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
