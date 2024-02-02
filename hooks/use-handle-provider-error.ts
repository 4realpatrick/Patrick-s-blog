import { DictionaryContext } from "@/components/dictionary-provider";
import { AuthError } from "next-auth";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

export default function useHandlerProviderError(errorKey: string = "error") {
  const searchParams = useSearchParams();
  const {
    common: { provider_error },
  } = useContext(DictionaryContext);
  const urlError = searchParams.get(errorKey) as AuthError["type"] | null;
  useEffect(() => {
    if (!urlError) return;
    toast.dismiss();
    toast.error(provider_error[urlError as keyof typeof provider_error]);
  }, [urlError]);
}
