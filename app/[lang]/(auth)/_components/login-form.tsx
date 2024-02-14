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
import UnderlineLink from "@/components/underline-link";
// Hooks
import { useForm } from "react-hook-form";
import { useContext, useTransition } from "react";
import useHandlerProviderError from "@/hooks/use-handle-provider-error";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Schema
import { LoginSchema } from "@/schemas";
import fetchHandler from "@/lib/fetch-handler";
// Actions
import { login } from "@/actions/login";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";

const LoginForm = () => {
  const [ispending, startTransition] = useTransition();
  const {
    pages: { login: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(value).then(fetchHandler);
    });
  };
  useHandlerProviderError();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonDictionary.email}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={ispending}
                    placeholder={commonDictionary.email_placeholder}
                    type="email"
                    className="border-primary"
                    autoComplete="email"
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
                <FormControl>
                  <Input
                    {...field}
                    disabled={ispending}
                    placeholder={commonDictionary.password_placeholder}
                    type="password"
                    className="border-primary"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <UnderlineLink href={`/${locale}/reset`} className="!mt-4 inline-block">
          {dictionary.forget_password}
        </UnderlineLink>
        <Button className="w-full" type="submit" disabled={ispending}>
          {ispending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {commonDictionary.login}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
