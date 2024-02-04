"use client";
// Cmp
import SettingTab from "./_components/tabs";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import GenralSetting from "./_components/genral-setting";
import ProfileSetting from "./_components/profile-setting";
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
        color: "#67bb67",
        content: <ProfileSetting />,
      },
      {
        title: setting.general.title,
        id: "general",
        icon: IoMdSettings,
        color: "#5d5dff",
        content: <GenralSetting />,
      },
    ];
  }, []);
  return (
    <div className="flex justify-center items-center h-full">
      <SettingTab tabs={tabs} />
    </div>
  );
};

export default SettingPage;
