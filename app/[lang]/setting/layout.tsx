import { Locale } from "@/i18n.config";

const SettingLayout = async ({
  children,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) => {
  return (
    <div className="w-full min-h-[inherit] p-10 bg-muted flex flex-col">
      {children}
    </div>
  );
};

export default SettingLayout;
