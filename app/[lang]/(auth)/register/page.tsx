"use client";
// Cmp
import RegisterForm from "@/app/[lang]/(auth)/_components/register-form";
import Social from "@/app/[lang]/(auth)/_components/social";
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
    pages: { register: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);

  const locale = useContext(LocaleContext);
  return (
    <RegisterFrame
      title={dictionary.title}
      description={
        <>
          {dictionary.description}
          <UnderlineLink href={`/${locale}/login`} className="ml-2">
            {dictionary.jump_link}
          </UnderlineLink>
        </>
      }
    >
      <RegisterForm />
      <Separator>{commonDictionary.or}</Separator>
      <Social />
    </RegisterFrame>
  );
};

export default RegisterPage;
