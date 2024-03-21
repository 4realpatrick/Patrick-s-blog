// Cmp
import RegisterForm from "@/app/[lang]/(auth)/_components/register-form";
import Social from "@/app/[lang]/(auth)/_components/social";
import Separator from "@/components/ui/separator";
import { Frame as RegisterFrame } from "../_components/frame";
import UnderlineLink from "@/components/underline-link";
// Utils
import { genPageMetadata } from "@/app/seo";
import { getDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
// Types
import { Locale } from "@/i18n.config";

export const metadata = genPageMetadata({ title: "Register page" });

export default async function RegisterPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const {
    pages: { register: dictionary },
    common: commonDictionary,
  } = await getDictionary(params.lang);
  const locale = getLocaleFromUrl();

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
}
