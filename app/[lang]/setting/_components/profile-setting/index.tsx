// Cmp
import Locked from "@/components/svg-components/locked";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import UpdateForm from "./update-form";
import ProfileAvatar from "./profile-avatar";
import Separator from "@/components/ui/separator";
import ChangePassword from "./change-password";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Hooks
import { useConrrentUser } from "@/hooks/use-current-user";
import { useContext, useEffect, useState } from "react";
// Utils
import { cn } from "@/lib/utils";

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
        <Link
          href={`/${locale}/login`}
          className={cn(buttonVariants({ variant: "default" }), "w-1/5")}
        >
          {commonDictionary.login}
        </Link>
      </div>
    );
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
