"use client";
import Image404 from "./svg-components/image-404";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { RiEnglishInput } from "react-icons/ri";
import { Toggle } from "./ui/toggle";
import { useMemo, useState } from "react";
const LostPage = () => {
  const router = useRouter();
  const [enableEn, setEnableEn] = useState(false);
  const dictionary = useMemo(() => {
    return enableEn
      ? {
          title: "The page or resource you are looking for does not exist",
          back: "Back to preview",
          home: "Homepage",
        }
      : {
          title: "您所访问的页面或资源不存在",
          back: "返回上一页",
          home: "首页",
        };
  }, [enableEn]);

  return (
    <div className="flex flex-col items-center bg-background px-20 mt-8 justify-center flex-1 space-y-10">
      <Image404 className="size-[500px]" />
      <h1 className="text-5xl">{dictionary.title}</h1>
      <div className="space-x-8 flex items-center">
        <Toggle
          aria-label="Toggle language"
          pressed={enableEn}
          onPressedChange={setEnableEn}
        >
          <RiEnglishInput className="size-6" />
        </Toggle>
        <Button size="lg" onClick={router.back}>
          {dictionary.back}
        </Button>
        <Button size="lg" onClick={() => router.push("/")}>
          {dictionary.home}
        </Button>
      </div>
    </div>
  );
};

export default LostPage;
