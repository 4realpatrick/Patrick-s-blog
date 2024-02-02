"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Button } from "../../../../components/ui/button";
import { RiNotionFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
type TProvider = "google" | "github" | "discord" | "notion";
const socials: {
  icon: IconType;
  provider: TProvider;
  iconClass: string;
  btnClass: string;
}[] = [
  {
    icon: FcGoogle,
    provider: "google",
    iconClass: "",
    btnClass: "",
  },
  {
    icon: FaGithub,
    provider: "github",
    iconClass: "",
    btnClass: "",
  },
  {
    icon: FaDiscord,
    provider: "discord",
    iconClass: "text-[#5a65ec]",
    btnClass: "",
  },
  {
    icon: RiNotionFill,
    provider: "notion",
    iconClass: "",
    btnClass: "",
  },
];
const Social = () => {
  const handleClick = (provider: TProvider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      {socials.map(({ icon, iconClass, btnClass, provider }) => (
        <Button
          key={provider}
          size="lg"
          className={cn("w-full", btnClass)}
          variant="outline"
          onClick={() => handleClick(provider)}
        >
          {icon({ className: cn("size-5", iconClass) })}
        </Button>
      ))}
    </div>
  );
};

export default Social;
