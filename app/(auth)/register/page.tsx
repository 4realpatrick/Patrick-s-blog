"use client";
// Cmp
import RegisterForm from "@/components/auth/register-form";
import Social from "@/components/auth/social";
import Separator from "@/components/ui/separator";
import Link from "next/link";
import { Frame as RegisterFrame } from "../_components/frame";

const RegisterPage = () => {
  return (
    <RegisterFrame
      title="创建一个账户"
      description={
        <>
          已经有帐户？
          <Link href="/login" className="pl-2 text-primary">
            点击登录
          </Link>
        </>
      }
    >
      <RegisterForm />
      <Separator>或者使用以下方式登录</Separator>
      <Social />
    </RegisterFrame>
  );
};

export default RegisterPage;
