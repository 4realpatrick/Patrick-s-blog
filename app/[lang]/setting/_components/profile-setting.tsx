// Cmp
import Locked from "@/components/svg-components/locked";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Avatar from "@/components/avatar";
import Separator from "@/components/ui/separator";
import UpdateForm from "./update-form";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Hooks
import { useSession } from "next-auth/react";
import { useContext } from "react";
import AvatarUploader from "@/components/avatar-uploader";

const ProfileSetting = () => {
  const { data } = useSession();
  const locale = useContext(LocaleContext);
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  if (!data?.user) {
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
  const { user } = data;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">{dictionary.title}</h1>
      <div className="flex items-center gap-x-8">
        <Avatar username={user.name!} src={user.image || "/male1.svg"} />
        <AvatarUploader />
      </div>
      <Separator useTheme={false} />
      <div className="w-1/2">
        <UpdateForm username={user.name!} email={user.email!} id={user.id!} />
      </div>
    </div>
  );
};

export default ProfileSetting;
