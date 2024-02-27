// Cmp
import DictionaryProvider from "@/components/dictionary-provider";
import Navbar from "@/components/navbar";
import ToTop from "@/components/to-top";
// Types
import { Locale } from "@/i18n.config";
// Utils
import { getDictionary } from "@/lib/dictionary";

const LangLayout = async ({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) => {
  const dictionary = await getDictionary(params.lang);
  return (
    <DictionaryProvider lang={params.lang} dictionary={dictionary}>
      <Navbar />
      <div className="size-full">{children}</div>
      <ToTop />
    </DictionaryProvider>
  );
};

export default LangLayout;
