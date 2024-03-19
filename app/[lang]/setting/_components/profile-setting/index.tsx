// Cmp
import UpdateForm from "./update-form";
import ProfileAvatar from "./profile-avatar";
import Separator from "@/components/ui/separator";
import ChangePassword from "./change-password";
import { Unauthorized } from "../unauthorized";
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
    return <Unauthorized />;
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{dictionary.title}</h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.description}
        </p>
        <Separator useTheme={false} />
      </div>
      <div className="space-y-10 mt-6">
        <ProfileAvatar />
        <UpdateForm username={user.name!} email={user.email!} id={user.id!} />
        <ChangePassword />
      </div>
    </>
  );
};

export default ProfileSetting;
