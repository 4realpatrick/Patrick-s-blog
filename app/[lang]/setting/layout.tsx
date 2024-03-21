import { genPageMetadata } from "@/app/seo";
import { Locale } from "@/i18n.config";

export const metadata = genPageMetadata({ title: "Setting" });

const SettingLayout = async ({
  children,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) => {
  return <div className="size-full p-10 flex flex-col">{children}</div>;
};

export default SettingLayout;
