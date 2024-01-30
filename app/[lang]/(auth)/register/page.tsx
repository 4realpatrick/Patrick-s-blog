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
import { DictionaryContext } from "@/components/dictionary-provider";
// Utils
import { addLocaleOnJump } from "@/lib/add-locale-on-jump";

const RegisterPage = () => {
  const {
    pages: { register: registerDictionary },
  } = useContext(DictionaryContext);
  return (
    <RegisterFrame
      title={registerDictionary.title}
      description={
        <>
          {registerDictionary.description}
          <UnderlineLink href={addLocaleOnJump("/login")} className="ml-2">
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
