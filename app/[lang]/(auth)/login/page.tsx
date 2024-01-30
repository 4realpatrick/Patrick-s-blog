"use client";
// Cmp
import LoginForm from "@/components/auth/login-form";
import Social from "@/components/auth/social";
import CompositeAlert from "@/components/composite-alert";
import { Frame as LoginFrame } from "../_components/frame";
import Separator from "@/components/ui/separator";
import UnderlineLink from "@/components/underline-link";
// Hooks
import { useContext } from "react";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
// Utils
import { addLocaleOnJump } from "@/lib/add-locale-on-jump";

const LoginPage = () => {
  const {
    pages: { login: loginDictionary },
  } = useContext(DictionaryContext);

  return (
    <LoginFrame
      title={loginDictionary.title}
      description={
        <>
          {loginDictionary.description}
          <UnderlineLink href={addLocaleOnJump("/register")} className="ml-2">
            {loginDictionary.jump_link}
          </UnderlineLink>
        </>
      }
    >
      <LoginForm dictionary={loginDictionary} />
      <Separator>{loginDictionary.separator_text}</Separator>
      <Social />
      <CompositeAlert
        title={loginDictionary.alert_title}
        className="mt-4 border-primary shadow-lg"
        description={loginDictionary.alert_description}
      />
    </LoginFrame>
  );
};

export default LoginPage;
