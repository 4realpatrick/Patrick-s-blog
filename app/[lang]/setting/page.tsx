"use client";
// Cmp
import SettingTab from "./_components/tabs";
import { CgDanger, CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import GenralSetting from "./_components/genral-setting";
import ProfileSetting from "./_components/profile-setting";
import DangerSetting from "./_components/danger-setting";
// Hooks
import { useContext, useMemo } from "react";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";

const SettingPage = () => {
  const {
    pages: { setting },
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
  return <SettingTab tabs={tabs} />;
};

export default SettingPage;
