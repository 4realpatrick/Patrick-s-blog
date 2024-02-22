import DictionaryProvider from "@/components/dictionary-provider";
import Navbar from "@/components/navbar";
import { Locale } from "@/i18n.config";
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
    </DictionaryProvider>
  );
};

export default LangLayout;
