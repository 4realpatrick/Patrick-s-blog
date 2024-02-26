// Cmp
import Locked from "@/components/svg-components/locked";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UpdateForm from "./update-form";
import ProfileAvatar from "./profile-avatar";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Hooks
import { useConrrentUser } from "@/hooks/use-current-user";
import { useContext, useEffect, useState } from "react";

const ProfileSetting = () => {
  const [mounted, setMounted] = useState(false);
  const user = useConrrentUser();
  const locale = useContext(LocaleContext);
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  if (!user) {
    return (
      <div className="size-full flex justify-center items-center flex-col gap-8">
        <Locked className="size-[40%]" />
        <h1 className="text-2xl">{dictionary.unauthorized}</h1>
        <Button className="w-[5%]">
          <Link href={`/${locale}/login`}>{commonDictionary.login}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">{dictionary.title}</h1>
      <ProfileAvatar />
      <div className="w-1/2">
        <UpdateForm username={user.name!} email={user.email!} id={user.id!} />
      </div>
    </div>
  );
};

export default ProfileSetting;
