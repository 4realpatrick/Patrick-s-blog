// Cmp
import Locked from "@/components/svg-components/locked";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// Context
import { LocaleContext } from "@/components/dictionary-provider";
// Types
import { TDictionary } from "@/lib/dictionary";
// Hooks
import { useSession } from "next-auth/react";
import { useContext } from "react";

const ProfileSetting = ({
  dictionary,
}: {
  dictionary: TDictionary["pages"]["setting"]["profile"];
}) => {
  const { data } = useSession();
  const locale = useContext(LocaleContext);
  if (!data?.user)
    return (
      <div className="size-full flex justify-center items-center flex-col gap-8">
        <Locked className="size-[40%]" />
        <h1 className="text-2xl">{dictionary.unauthorized}</h1>
        <Button className="w-[5%]">
          <Link href={`/${locale}/login`}>{dictionary.login}</Link>
        </Button>
      </div>
    );
  return <div>profile-setting</div>;
};

export default ProfileSetting;
