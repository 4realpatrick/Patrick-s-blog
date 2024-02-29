"use client";
// Cmp
import SpotlightButton from "@/components/buttons/spotlight-button";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Utils
import fetchHandler from "@/lib/fetch-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signOut } from "next-auth/react";
// Hooks
import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
// Schema
import { UpdatePasswordSchema } from "@/schemas";
// Server action
import { updatePassword } from "@/actions/update-password";
import CompositeAlert from "@/components/composite-alert";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: z.infer<typeof UpdatePasswordSchema>) => {
    startTransition(() => {
      updatePassword(data).then((res) => {
        fetchHandler(res, {
          callback(isSuccess) {
            if (isSuccess) {
              signOut({
                callbackUrl: `/${locale}/login`,
              });
              setOpen(false);
            }
          },
        });
      });
    });
  };
  return (
    <div className="space-y-2">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <SpotlightButton>{dictionary.password_alert_title}</SpotlightButton>
        </AlertDialogTrigger>
        <AlertDialogContent className="select-none">
          <AlertDialogHeader>
            <AlertDialogTitle>{dictionary.change_password}</AlertDialogTitle>
          </AlertDialogHeader>
          <CompositeAlert title={dictionary.password_description} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.old_password}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={pending}
                          placeholder={commonDictionary.password_placeholder}
                          className="border-primary rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.new_password}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={pending}
                          type="password"
                          placeholder={commonDictionary.password_placeholder}
                          className="border-primary rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.confirm_password}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={pending}
                          type="password"
                          placeholder={commonDictionary.password_placeholder}
                          className="border-primary rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={pending}>
                  {commonDictionary.cancel}
                </AlertDialogCancel>
                <Button
                  type="submit"
                  // onClick={handleDelete}
                  disabled={pending}
                >
                  {commonDictionary.sure}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChangePassword;
