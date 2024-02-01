// Cmp
import LanguageController from "@/components/language-controller";
import { ThemeController } from "@/components/theme/theme-controller";
import { MdLanguage } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
// Hooks
import { useContext, useMemo } from "react";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
import CompositeAlert from "@/components/composite-alert";

const GenralSetting = () => {
  const {
    pages: {
      setting: { general },
    },
  } = useContext(DictionaryContext);
  const settings = useMemo(() => {
    return [
      {
        title: general.theme,
        description: general.theme_description,
        id: "theme",
        icon: IoIosColorPalette,
        cmp: <ThemeController />,
      },
      {
        title: general.language,
        description: general.language_description,
        id: "language",
        icon: MdLanguage,
        cmp: <LanguageController dictionary={general} />,
      },
    ];
  }, []);
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">{general.title}</h1>
      <CompositeAlert
        title={general.alert_title}
        description={general.alert_description}
      />
      {settings.map((setting) => (
        <div
          className="flex bg-primary/5 p-4 rounded-md transition-[background]"
          key={setting.id}
        >
          {setting.icon({ className: "size-6 mr-4 mt-1 text-primary" })}
          <div className="space-y-2 flex-1">
            <h2 className="text-xl">{setting.title}</h2>
            <div className="text-sm text-muted-foreground">
              {setting.description}
            </div>
          </div>
          {setting.cmp}
        </div>
      ))}
    </div>
  );
};

export default GenralSetting;
