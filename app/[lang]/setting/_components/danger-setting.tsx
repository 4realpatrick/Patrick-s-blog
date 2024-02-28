// Cmp
import { CgDanger } from "react-icons/cg";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Hooks
import { useContext, useState, useTransition } from "react";
import { useConrrentUser } from "@/hooks/use-current-user";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Utils
import { toast } from "sonner";
import fetchHandler from "@/lib/fetch-handler";
import { signOut } from "next-auth/react";
// Server actions
import { deleteAccount } from "@/actions/delete-account";

const DangerSetting = () => {
  const [pending, startTransition] = useTransition();
  const {
    pages: {
      setting: { danger: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  const [inputVal, setInputVal] = useState("");
  const [open, setOpen] = useState(false);
  const user = useConrrentUser();
  if (!user) return null;

  const handleDelete = () => {
    if (inputVal !== user.name) {
      toast.error(dictionary.alert_error);
      return;
    }
    startTransition(() => {
      deleteAccount(inputVal).then((res) => {
        fetchHandler(res);
        if (res.success) {
          setOpen(false);
          signOut({
            callbackUrl: `/${locale}/login`,
          });
        }
      });
    });
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{dictionary.title}</h1>
      <div className="flex bg-destructive/20 p-4 rounded-md transition-[background]">
        <CgDanger className="size-6 mr-4 mt-1 text-destructive" />
        <div className="space-y-2 flex-1">
          <h2 className="text-xl">{dictionary.delete_account}</h2>
          <div className="text-sm text-muted-foreground">
            {dictionary.delete_account_description}
          </div>
        </div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              {dictionary.delete_account_btn}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="select-none">
            <AlertDialogHeader>
              <AlertDialogTitle>{dictionary.alert_title}</AlertDialogTitle>
              <AlertDialogDescription>
                {dictionary.alert_description}
                <span className="text-destructive ml-2">{user.name}</span>
              </AlertDialogDescription>
              <Input
                placeholder={dictionary.alert_placeholder}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>
                {commonDictionary.cancel}
              </AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={pending}
              >
                {commonDictionary.sure}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DangerSetting;
