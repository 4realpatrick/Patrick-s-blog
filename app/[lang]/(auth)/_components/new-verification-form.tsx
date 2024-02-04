"use client";
// Cmp
import VerificationIcon from "@/components/svg-components/verification-icon";
import ErrorRobot from "@/components/svg-components/error-robot";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DotLoader from "@/components/loader/dot-loader";
// Hooks
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
// Server actions
import { newVerification } from "@/actions/new-verification";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";
// Utils
import fetchHandler from "@/lib/fetch-handler";
import { toast } from "sonner";
import { LazyMotion, domAnimation, m } from "framer-motion";

const NewVerificationForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const locale = useContext(LocaleContext);
  const {
    pages: { newVerification: dictionary },
  } = useContext(DictionaryContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      return toast.error(dictionary.miss_token);
    }
    newVerification(token!)
      .then((res) => {
        if (!res.success) {
          setError(res.message);
        }
        fetchHandler(res, {
          callback(isSuccess) {
            if (isSuccess) {
              // 成功后重定向到登录页
              router.push(`/${locale}/login`);
            }
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSubmit();
    }, 4000);
    return () => clearTimeout(timerId);
  }, [onSubmit]);

  useEffect(() => {
    if (!token) {
      setError(dictionary.miss_token);
    }
  }, [token]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="flex items-center justify-center flex-col gap-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {isSuccess && (
          <>
            <VerificationIcon />
            <h1 className="text-2xl">{dictionary.success}</h1>
          </>
        )}
        {error && (
          <>
            <ErrorRobot />
            <h1 className="text-2xl">{error}</h1>
            <Button className="w-1/5">
              <Link href={`/${locale}`}>{dictionary.homepage}</Link>
            </Button>
          </>
        )}
        {loading && !error && (
          <>
            <VerificationIcon />
            <h1 className="text-2xl">{dictionary.title}</h1>
            <DotLoader className="mt-4" />
          </>
        )}
      </m.div>
    </LazyMotion>
  );
};

export default NewVerificationForm;
