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
import VerificationIcon from "@/components/svg-components/verification-icon";
import DotLoader from "@/components/loader/dot-loader";
import ErrorRobot from "@/components/svg-components/error-robot";
import Link from "next/link";
// Hooks
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Utils
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { showup } from "@/constant/animations";
// Schema
import { NewPasswordSchema } from "@/schemas";
import fetchHandler from "@/lib/fetch-handler";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Server actions
import { newPasswordTokenCheck } from "@/actions/new-password-token-check";
import { newPassword } from "@/actions/new-password";

const ResetForm = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [ispending, startTransition] = useTransition();

  const router = useRouter();

  const {
    pages: { newPassword: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      newPassword(value, token).then((res) => {
        fetchHandler(res, {
          callback(isSuccess) {
            isSuccess && router.push(`/${locale}/login`);
          },
        });
        if (!res.success) {
          return setError(res.message);
        }
        setSuccess(true);
      });
    });
  };
  useEffect(() => {
    if (!token) {
      return setError("缺少Token");
    }
    const onCheckTokenExist = () => {
      newPasswordTokenCheck(token)
        .then((res) => {
          if (!res.success) {
            setError(res.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const timerId = setTimeout(onCheckTokenExist, 2000);
    return () => clearTimeout(timerId);
  }, [token]);
  const isError = error && !loading;
  const isSuccess = success && !error && !loading;
  const isFillingForm = !loading && !error && !success;
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="flex items-center flex-col gap-y-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {isError && (
          <>
            <ErrorRobot />
            <h1 className="text-2xl">{error}</h1>
            <Button className="w-1/5">
              <Link href={`/${locale}/login`}>{dictionary.to_login}</Link>
            </Button>
          </>
        )}
        {isSuccess && (
          <>
            <VerificationIcon />
            <h1 className="text-2xl">{dictionary.success}</h1>
            <DotLoader className="mt-4" />
          </>
        )}
        {isFillingForm && (
          <div className="w-full space-y-8">
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{commonDictionary.email}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={ispending}
                            placeholder={commonDictionary.email_placeholder}
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
                <Button
                  className="flex-1 w-1/4"
                  type="submit"
                  disabled={ispending}
                >
                  {ispending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {dictionary.action_btn}
                </Button>
              </m.form>
            </Form>
          </div>
        )}
        {loading && (
          <>
            <VerificationIcon />
            <h1 className="text-2xl">{dictionary.verifying}</h1>
            <DotLoader className="mt-4" />
          </>
        )}
      </m.div>
    </LazyMotion>
  );
};

export default ResetForm;
