// Cmp
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// Hooks
import {
  type MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useSession } from "next-auth/react";
// Utils
import { toast } from "sonner";
import { LazyMotion, domAnimation, m } from "framer-motion";
// Server actions
import { updateAvatar } from "@/actions/upload-avatar";
import fetchHandler from "@/lib/fetch-handler";
// Context
import { DictionaryContext } from "./dictionary-provider";

const AnimateAvatar = m(Avatar);

const AvatarUploader = () => {
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isPending, setTransition] = useTransition();
  const { data, update } = useSession();
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const onSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!selectedAvatar || !data?.user) {
        return toast.error(dictionary.error);
      }
      setTransition(async () => {
        const res = await updateAvatar(selectedAvatar, data.user.id!);
        if (res.success) {
          await update({
            image: selectedAvatar,
          });
          setOpen(false);
        }
        fetchHandler(res);
      });
    },
    [selectedAvatar]
  );

  useEffect(() => {
    if (!open) {
      setSelectedAvatar(null);
    }
  }, [open]);
  return (
    <LazyMotion features={domAnimation}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="lg">{commonDictionary.change}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="px-10 py-8 max-w-[40rem]">
          <AlertDialogHeader className="space-y-6">
            <AlertDialogTitle>{dictionary.choose_avatar}</AlertDialogTitle>
            <AlertDialogDescription className="grid grid-cols-5 gap-6">
              {Array.from({ length: 20 }).map((v, index) => {
                const path = `/avatar${index + 1}.svg`;
                return (
                  <>
                    <AnimateAvatar
                      className="size-20 hover:!opacity-70 cursor-pointer relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      onClick={() => setSelectedAvatar(path)}
                    >
                      <AvatarImage src={path} alt="@shadcn" />
                      <AvatarFallback>Avatar</AvatarFallback>
                      {selectedAvatar === path && (
                        <div className="absolute inset-0 bg-muted-foreground/20 flex items-center justify-center">
                          <FaCheck className="text-white" />
                        </div>
                      )}
                    </AnimateAvatar>
                  </>
                );
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 pr-4">
            <AlertDialogCancel disabled={isPending}>
              {commonDictionary.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit} disabled={isPending}>
              {commonDictionary.update}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LazyMotion>
  );
};

export default AvatarUploader;
