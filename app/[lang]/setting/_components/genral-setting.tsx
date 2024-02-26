// Cmp
import LanguageController from "@/components/language-controller";
import { ThemeController } from "@/components/theme/theme-controller";
import { MdLanguage } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
// Hooks
import { useContext, useMemo } from "react";
// Context
import CompositeAlert from "@/components/composite-alert";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
import { ModeController } from "@/components/theme/mode-controller";

const GenralSetting = () => {
  const {
    pages: {
      setting: { general: dictionary },
    },
  } = useContext(DictionaryContext);
  const settings = useMemo(() => {
    return [
      {
        title: dictionary.mode,
        description: dictionary.mode_description,
        id: "mode",
        icon: MdOutlineDarkMode,
        cmp: <ModeController />,
      },
      {
        title: dictionary.theme,
        description: dictionary.theme_description,
        id: "theme",
        icon: IoIosColorPalette,
        cmp: <ThemeController />,
      },
      {
        title: dictionary.language,
        description: dictionary.language_description,
        id: "language",
        icon: MdLanguage,
        cmp: <LanguageController />,
      },
    ];
  }, []);
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">{dictionary.title}</h1>
      <CompositeAlert
        title={dictionary.alert_title}
        description={dictionary.alert_description}
      />
      {settings.map((setting) => (
        <div
          className="flex bg-primary/20 p-4 rounded-md transition-[background]"
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
