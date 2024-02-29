"use client";
// Cmp
import { Loader2 } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { MdVerified } from "react-icons/md";
import Hint from "@/components/hint";
// Hooks
import { useForm } from "react-hook-form";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useSession } from "next-auth/react";
import useHandlerProviderError from "@/hooks/use-handle-provider-error";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import fetchHandler from "@/lib/fetch-handler";
import { m } from "framer-motion";
// Schema
import { UpdateSchema } from "@/schemas";
// Actions
import { updateProfile } from "@/actions/update-profile";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";

interface IUpdateFormProps {
  username: string;
  email: string;
  id: string;
}

const UpdateForm: React.FC<IUpdateFormProps> = ({ username, email }) => {
  const [ispending, startTransition] = useTransition();
  const [hasChanged, setHasChanged] = useState(false);
  const {
    pages: {
      setting: { profile: dictionary },
    },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const { update } = useSession();
  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      name: username,
    },
  });
  // trigger mannual setter when session update
  useEffect(() => {
    form.setValue("name", username);
  }, [username]);
  const handleOnChange = () => {
    setHasChanged(true);
  };
  const onReset = useCallback(() => {
    form.reset({
      name: username,
    });
    form.clearErrors();
    setHasChanged(false);
  }, [form]);
  const onSubmit = (value: z.infer<typeof UpdateSchema>) => {
    startTransition(() => {
      updateProfile(value).then(async (res) => {
        if (res.success) {
          // 更新session
          await update({
            name: value.name,
          });
        }
        fetchHandler(res);
        setHasChanged(false);
      });
    });
  };
  useHandlerProviderError();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        onChange={handleOnChange}
      >
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
                    className="border-primary rounded-sm"
                  />
                </FormControl>
                <FormDescription>
                  {dictionary.username_description}
                </FormDescription>
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
                  className="w-full"
                  value={email}
                />
              </div>
            </Hint>
            <FormDescription>{dictionary.email_description}</FormDescription>
          </FormItem>
        </div>
        <m.div
          className="flex gap-10 w-1/2"
          initial={{ x: -100, opacity: 0, display: "none" }}
          animate={
            hasChanged
              ? { x: 0, opacity: 1, display: "flex" }
              : { x: -100, opacity: 0, transitionEnd: { display: "none" } }
          }
          transition={{ duration: 0.5 }}
        >
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
        </m.div>
      </form>
    </Form>
  );
};

export default UpdateForm;
