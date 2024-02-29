// Cmp
import LanguageController from "@/components/language-controller";
import { ThemeColorController } from "@/components/theme/theme-color-controller";
import { MdLanguage } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
// Hooks
import { useContext, useMemo } from "react";
// Context
import CompositeAlert from "@/components/composite-alert";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
import { ThemeController } from "@/components/theme/theme-controller";
import Separator from "@/components/ui/separator";

const GenralSetting = () => {
  const {
    pages: {
      setting: { general: dictionary },
    },
  } = useContext(DictionaryContext);
  const settings = useMemo(() => {
    return [
      {
        title: dictionary.theme,
        description: dictionary.theme_description,
        id: "mode",
        icon: MdOutlineDarkMode,
        cmp: <ThemeController />,
      },
      {
        title: dictionary.theme_color,
        description: dictionary.theme_color_description,
        id: "theme",
        icon: IoIosColorPalette,
        cmp: <ThemeColorController />,
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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{dictionary.title}</h3>
      <p className="text-sm text-muted-foreground">{dictionary.description}</p>
      <Separator useTheme={false} className="my-6" />
      <CompositeAlert
        title={dictionary.alert_title}
        description={dictionary.alert_description}
      />
      <div className="space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></label>
        </div>
      </div>
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
