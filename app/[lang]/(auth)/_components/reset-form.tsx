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
import Link from "next/link";
// Hooks
import { useForm } from "react-hook-form";
import { useContext, useTransition } from "react";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { showup } from "@/constant/animations";
// Schema
import { ResetSchema } from "@/schemas";
import fetchHandler from "@/lib/fetch-handler";
// Actions
import { reset } from "@/actions/reset";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";

const ResetForm = () => {
  const [ispending, startTransition] = useTransition();
  const {
    pages: { reset: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (value: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(value).then(fetchHandler);
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.h1
        className="text-5xl font-bold tracking-widest font-[Overpass]"
        {...showup({ delay: 0.5 })}
      >
        {dictionary.title}
      </m.h1>
      <m.div
        className="mt-4 text-lg"
        {...showup({ duration: 0.5, delay: 0.5 })}
      >
        {dictionary.description}
      </m.div>
      <Form {...form}>
        <m.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
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
          </div>
          <div className="flex items-center gap-8 w-1/2">
            <Button
              className="flex-1"
              variant="outline"
              type="button"
              disabled={ispending}
            >
              <Link href={`/${locale}/login`}>{dictionary.cancel_btn}</Link>
            </Button>
            <Button className="flex-1" type="submit" disabled={ispending}>
              {ispending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {dictionary.action_btn}
            </Button>
          </div>
        </m.form>
      </Form>
    </LazyMotion>
  );
};

export default ResetForm;
