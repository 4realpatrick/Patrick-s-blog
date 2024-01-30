"use client";
// Cmp
import RegisterForm from "@/components/auth/register-form";
import Social from "@/components/auth/social";
import Separator from "@/components/ui/separator";
import { Frame as RegisterFrame } from "../_components/frame";
import UnderlineLink from "@/components/underline-link";
// Hooks
import { useContext } from "react";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";

const RegisterPage = () => {
  const {
    pages: { register: registerDictionary },
  } = useContext(DictionaryContext);

  const locale = useContext(LocaleContext);
  return (
    <RegisterFrame
      title={registerDictionary.title}
      description={
        <>
          {registerDictionary.description}
          <UnderlineLink href={`/${locale}/login`} className="ml-2">
            {registerDictionary.jump_link}
          </UnderlineLink>
        </>
      }
    >
      <RegisterForm dictionary={registerDictionary} />
      <Separator>{registerDictionary.separator_text}</Separator>
      <Social />
    </RegisterFrame>
  );
};

export default RegisterPage;
