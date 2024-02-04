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
// Hooks
import { useForm } from "react-hook-form";
import { useContext, useTransition } from "react";
import useHandlerProviderError from "@/hooks/use-handle-provider-error";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import fetchHandler from "@/lib/fetch-handler";
// Schema
import { RegisterSchema } from "@/schemas";
// Actions
import { register } from "@/actions/register";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";

const RegisterForm = () => {
  const [ispending, startTransition] = useTransition();
  const {
    pages: { register: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (value: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(value).then(fetchHandler);
    });
  };
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
        <Button className="w-full" type="submit" disabled={ispending}>
          {ispending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {dictionary.register_btn}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
