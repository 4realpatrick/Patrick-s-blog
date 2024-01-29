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

export default function SettingDropdown() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-lg" size="lg">
          <IoMdMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>菜单</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IoMdContact className="mr-2 size-4" />
              <span>联系我</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <FaBilibili className="mr-2 size-4" />
                  <Link href="https://space.bilibili.com/24280623">
                    Bilibili
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaGithub className="mr-2 size-4" />
                  <Link href="https://github.com/4realpatrick">Github</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <GoPlusCircle className="mr-2 size-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <IoMdSettings className="mr-2 size-4" />
            <span>设置</span>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {session.data?.user ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <TbLogin2 className="mr-2 size-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">
              <TbLogin className="mr-2 size-4" />
              <span>登录</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
