// Cmp
import LoginForm from "@/app/[lang]/(auth)/_components/login-form";
import Social from "@/app/[lang]/(auth)/_components/social";
import CompositeAlert from "@/components/composite-alert";
import { Frame as LoginFrame } from "../_components/frame";
import Separator from "@/components/ui/separator";
import UnderlineLink from "@/components/underline-link";
// Utils
import { genPageMetadata } from "@/app/seo";
import { getDictionary } from "@/lib/dictionary";
import { getLocaleFromUrl } from "@/lib/get-locale";
// Types
import { Locale } from "@/i18n.config";

export const metadata = genPageMetadata({ title: "Login page" });

export default async function LoginPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const {
    pages: { login: dictionary },
    common: commonDictionary,
  } = await getDictionary(params.lang);
  const locale = getLocaleFromUrl();

  return (
    <LoginFrame
      title={dictionary.title}
      description={
        <>
          {dictionary.description}
          <UnderlineLink href={`/${locale}/register`} className="ml-2">
            {dictionary.jump_link}
          </UnderlineLink>
        </>
      }
    >
      <LoginForm />
      <Separator>{commonDictionary.or}</Separator>
      <Social />
      <CompositeAlert
        title={dictionary.alert_title}
        className="mt-4 border-primary shadow-lg"
        description={dictionary.alert_description}
      />
    </LoginFrame>
  );
}
