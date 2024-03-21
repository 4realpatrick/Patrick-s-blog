// Types
import { Locale } from "@/i18n.config";
// Utils
import { getDictionary } from "@/lib/dictionary";

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}) {
  const {
    pages: { blog: dictionary },
  } = await getDictionary(params.lang);

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            {dictionary.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {dictionary.description}
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {children}
    </div>
  );
}
