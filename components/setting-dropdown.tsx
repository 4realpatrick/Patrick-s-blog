"use client";
// Cmp
import { IoMdMenu, IoMdContact, IoMdSettings } from "react-icons/io";
import { FaBilibili, FaGithub } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { TbLogin, TbLogin2 } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
// Utils
import { signOut } from "next-auth/react";
// Types
import { TDictionary } from "@/lib/dictionary";
// Hooks
import { useContext } from "react";
import { useConrrentUser } from "@/hooks/use-current-user";
// Context
import { LocaleContext } from "./dictionary-provider";
import { cn } from "@/lib/utils";

export const contacts = [
  {
    id: "bilibili",
    icon: FaBilibili,
    iconClass: "text-[#00AEEC]",
    title: "Bilibili",
    href: "https://space.bilibili.com/24280623",
  },
  {
    id: "github",
    icon: FaGithub,
    iconClass: "",
    title: "Github",
    href: "https://github.com/4realpatrick",
  },
  {
    id: "email",
    icon: MdEmail,
    iconClass: "text-primary",
    title: "Email",
    href: "mailto:patrick577995@gmail.com",
  },
];

export default function SettingDropdown({
  dictionary,
}: {
  dictionary: TDictionary["common"];
}) {
  const user = useConrrentUser();
  const locale = useContext(LocaleContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-lg" size="lg">
          <IoMdMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{dictionary.menu}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IoMdContact className="mr-2 size-4" />
              <span>{dictionary.contact}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {contacts.map((contact) => (
                  <DropdownMenuItem key={contact.id}>
                    <Link
                      href={contact.href}
                      target="_blank"
                      className="flex items-center"
                    >
                      {contact.icon({
                        className: cn("mr-2 size-4", contact.iconClass),
                      })}
                      {contact.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <GoPlusCircle className="mr-2 size-4" />
                  <span>{dictionary.more}...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Link
              href={`/${locale}/setting`}
              className="w-full flex items-center"
            >
              <IoMdSettings className="mr-2 size-4" />
              <span>{dictionary.setting}</span>
            </Link>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: `/${locale}/login`,
              })
            }
          >
            <TbLogin2 className="mr-2 size-4" />
            <span>{dictionary.signout}</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link
              href={`/${locale}/login`}
              className="w-full flex items-center"
            >
              <TbLogin className="mr-2 size-4" />
              <span>{dictionary.login}</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
