"use client";
// Cmp
import SettingTab from "./_components/tabs";
import { CgDanger, CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import GenralSetting from "./_components/genral-setting";
import ProfileSetting from "./_components/profile-setting";
import DangerSetting from "./_components/danger-setting";
import Separator from "@/components/ui/separator";
// Hooks
import { useContext, useMemo } from "react";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
// Utils
import { LazyMotion, domAnimation, m } from "framer-motion";
import { showup } from "@/constant/animations";

const SettingPage = () => {
  const {
    pages: { setting },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const tabs = useMemo(() => {
    return [
      {
        title: setting.profile.title,
        id: "profile",
        icon: CgProfile,
        content: <ProfileSetting />,
      },
      {
        title: setting.general.title,
        id: "general",
        icon: IoMdSettings,
        content: <GenralSetting />,
      },
      {
        title: setting.danger.title,
        id: "danger",
        icon: CgDanger,
        content: <DangerSetting />,
      },
    ];
  }, []);
  return (
    <LazyMotion features={domAnimation}>
      <m.div className="space-y-2" {...showup()}>
        <h2 className="text-2xl font-bold tracking-tight">
          {commonDictionary.setting}
        </h2>
        <p className="text-muted-foreground">{setting.description}</p>
        <Separator useTheme={false} className="!mt-7" />
      </m.div>
      <SettingTab tabs={tabs} defaultIndex={1} />
    </LazyMotion>
  );
};

export default SettingPage;
