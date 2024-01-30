"use client";
// Cmp
import { IoMdMenu, IoMdContact, IoMdSettings } from "react-icons/io";
import { FaBilibili, FaGithub } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { TbLogin, TbLogin2 } from "react-icons/tb";
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
import { useSession, signOut } from "next-auth/react";
import { TDictionary } from "@/lib/dictionary";
import { useContext } from "react";
import { LocaleContext } from "./dictionary-provider";

export default function SettingDropdown({
  dictionary,
}: {
  dictionary: TDictionary["components"]["navbar"];
}) {
  const session = useSession();
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
                <DropdownMenuItem>
                  <FaBilibili className="mr-2 size-4" />
                  <Link
                    href="https://space.bilibili.com/24280623"
                    target="_blank"
                  >
                    Bilibili
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaGithub className="mr-2 size-4" />
                  <Link href="https://github.com/4realpatrick" target="_blank">
                    Github
                  </Link>
                </DropdownMenuItem>
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
        {session.data?.user ? (
          <DropdownMenuItem onClick={() => signOut()}>
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
