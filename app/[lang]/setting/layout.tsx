import { Locale } from "@/i18n.config";

const SettingLayout = async ({
  children,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) => {
  return <div className="size-full p-10 flex flex-col pt-20">{children}</div>;
};

export default SettingLayout;
