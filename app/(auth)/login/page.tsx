"use client";
// Cmp
import LoginForm from "@/components/auth/login-form";
import Social from "@/components/auth/social";
import CompositeAlert from "@/components/composite-alert";
import Link from "next/link";
import { Frame as LoginFrame } from "../_components/frame";
import Separator from "@/components/ui/separator";
const LoginPage = () => {
  return (
    <LoginFrame
      title="欢迎回来"
      description={
        <>
          还没有账户吗？
          <Link href="/register" className="pl-2 text-primary">
            点击注册
          </Link>
        </>
      }
    >
      <LoginForm />
      <Separator>或者使用以下方式登录</Separator>
      <Social />
      <CompositeAlert
        title="您无需登录亦可浏览此网站的所有文章，只是部分功能会有所限制"
        className="mt-4 border-primary shadow-lg"
        description="例如评论、点赞、查看记录等"
      />
    </LoginFrame>
  );
};

export default LoginPage;
