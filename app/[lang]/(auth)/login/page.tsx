"use client";
// Cmp
import LoginForm from "@/app/[lang]/(auth)/_components/login-form";
import Social from "@/app/[lang]/(auth)/_components/social";
import CompositeAlert from "@/components/composite-alert";
import { Frame as LoginFrame } from "../_components/frame";
import Separator from "@/components/ui/separator";
import UnderlineLink from "@/components/underline-link";
// Hooks
import { useContext } from "react";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";

const LoginPage = () => {
  const {
    pages: { login: loginDictionary },
  } = useContext(DictionaryContext);

  const locale = useContext(LocaleContext);

  return (
    <LoginFrame
      title={loginDictionary.title}
      description={
        <>
          {loginDictionary.description}
          <UnderlineLink href={`/${locale}/register`} className="ml-2">
            {loginDictionary.jump_link}
          </UnderlineLink>
        </>
      }
    >
      <LoginForm />
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
