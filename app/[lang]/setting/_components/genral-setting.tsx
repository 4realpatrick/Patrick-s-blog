// Cmp
import LanguageController from "@/components/language-controller";
import { ThemeColorController } from "@/components/theme/theme-color-controller";
import { MdLanguage } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import Separator from "@/components/ui/separator";
import { ThemeController } from "@/components/theme/theme-controller";
// Hooks
import { useContext, useMemo } from "react";
// Context
import CompositeAlert from "@/components/composite-alert";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";

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
        cmp: <ThemeController type="expand" />,
      },
      {
        title: dictionary.theme_color,
        description: dictionary.theme_color_description,
        id: "theme",
        icon: IoIosColorPalette,
        cmp: <ThemeColorController type="expand" />,
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
        {settings.map((setting) => (
          <div className="space-y-2" key={setting.id}>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {setting.title}
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              {setting.description}
            </p>
            {setting.cmp}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenralSetting;
