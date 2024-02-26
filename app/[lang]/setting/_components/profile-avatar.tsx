// Cmp
import UserAvatar from "@/components/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import {
  CldUploadButton,
  CldUploadWidgetInfo,
  type CldUploadWidgetResults,
} from "next-cloudinary";
// Hooks
import { useSession } from "next-auth/react";
import { Fragment, useContext } from "react";
import { useConrrentUser } from "@/hooks/use-current-user";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";
// Utils
import { LazyMotion, domAnimation, m } from "framer-motion";
import fetchHandler from "@/lib/fetch-handler";
// Server actions
import { updateAvatar } from "@/actions/upload-avatar";

const AnimateAvatar = m(Avatar);

const ProfileAvatar = () => {
  const { update } = useSession();
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const user = useConrrentUser();
  if (!user) return null;
  const handleUpload = async (result: CldUploadWidgetResults) => {
    const info = result.info as CldUploadWidgetInfo;
    const res = await updateAvatar(info.secure_url, user.id!);
    fetchHandler(res);
    if (res.success) {
      await update({
        image: info.secure_url,
      });
    }
  };
  const handleSelect = async (path: string) => {
    const res = await updateAvatar(path, user.id!);
    fetchHandler(res);
    if (res.success) {
      await update({
        image: path,
      });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex items-center gap-x-8 w-1/2">
        <UserAvatar username={user.name!} src={user.image!} />
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{dictionary.choose_avatar}</AccordionTrigger>
          <AccordionContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
              {Array.from({ length: 20 }).map((v, index) => {
                const path = `/avatars/avatar${index + 1}.svg`;
                return (
                  <Fragment key={path}>
                    <AnimateAvatar
                      className="size-20 hover:!opacity-70 cursor-pointer relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      onClick={() => handleSelect(path)}
                    >
                      <AvatarImage src={path} alt="@shadcn" />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </AnimateAvatar>
                  </Fragment>
                );
              })}
            </div>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="space-y-6"
            >
              <div className="text-xl">{dictionary.custom}</div>
              <Button asChild className="w-1/4">
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset="vcpzquyc"
                  className="size-full"
                >
                  {commonDictionary.upload}
                </CldUploadButton>
              </Button>
            </m.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </LazyMotion>
  );
};

export default ProfileAvatar;
