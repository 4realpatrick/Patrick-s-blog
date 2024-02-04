"use client";
// Cmp
import { Loader2 } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MdVerified } from "react-icons/md";
// Hooks
import { useForm } from "react-hook-form";
import { useCallback, useContext, useState, useTransition } from "react";
import useHandlerProviderError from "@/hooks/use-handle-provider-error";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import fetchHandler from "@/lib/fetch-handler";
import { signOut } from "next-auth/react";
// Schema
import { UpdateSchema } from "@/schemas";
// Actions
import { updateProfile } from "@/actions/update-profile";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
import Hint from "@/components/hint";
interface IUpdateFormProps {
  username: string;
  email: string;
  id: string;
}
const UpdateForm: React.FC<IUpdateFormProps> = ({ username, email, id }) => {
  const [ispending, startTransition] = useTransition();
  const [isPwdEdit, setIsPwdEdit] = useState(false);
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      password: "",
      name: username,
    },
  });

  const onSubmit = (value: z.infer<typeof UpdateSchema>) => {
    if (isPwdEdit && !value.password) {
      return form.setError("password", {
        message: commonDictionary.password_error,
      });
    }
    startTransition(() => {
      updateProfile(value, id)
        .then((res) => {
          fetchHandler(res, {
            callback(isSuccess) {
              if (!isSuccess) {
                return onReset();
              }
              if (isSuccess && value.password) {
                return signOut({
                  callbackUrl: `/${locale}/login`,
                });
              }
            },
          });
        })
        .finally(() => {
          setIsPwdEdit(false);
          form.reset({
            password: "",
          });
        });
    });
  };
  const onReset = useCallback(() => {
    form.reset({
      password: "",
      name: username,
    });
    form.clearErrors();
    setIsPwdEdit(false);
  }, [isPwdEdit, form]);

  useHandlerProviderError();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonDictionary.usename}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={ispending}
                    placeholder={commonDictionary.usename_placeholder}
                    className="border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonDictionary.password}</FormLabel>
                <div className="flex gap-10">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={ispending || !isPwdEdit}
                      placeholder={commonDictionary.password_placeholder}
                      type="password"
                      className={isPwdEdit ? "border-primary" : ""}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setIsPwdEdit((prev) => !prev)}
                    className="w-1/5"
                  >
                    {commonDictionary.change}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel className="flex items-center">
              <MdVerified className="size-6 text-green-500 mr-2" />
              {commonDictionary.email}
            </FormLabel>
            <Hint descrption={dictionary.email_tip} asChild>
              <div className="w-full">
                <Input
                  disabled={true}
                  placeholder={commonDictionary.usename_placeholder}
                  className="border-none w-full"
                  value={email}
                />
              </div>
            </Hint>
          </FormItem>
        </div>
        <div className="flex gap-10 w-1/2">
          <Button
            className="w-full"
            type="reset"
            disabled={ispending}
            variant="outline"
            onClick={onReset}
          >
            {commonDictionary.cancel}
          </Button>
          <Button className="w-full" type="submit" disabled={ispending}>
            {ispending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {dictionary.update_profile}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateForm;
