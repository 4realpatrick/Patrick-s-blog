"use client";
import { Button } from "@/components/ui/button";
import { LuCalendarClock } from "react-icons/lu";
import { FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBlogAction, IBlogState } from "@/hooks/use-blog-state";
import { TDictionary } from "@/lib/dictionary";

export function TimeFilter({
  timeOrder,
  dictionary,
  setFilter,
}: {
  timeOrder: IBlogState["filters"]["timeOrder"];
  setFilter: IBlogAction["setFilter"];
  dictionary: TDictionary["components"]["blog_filter"]["time_filter"];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {(timeOrder === "ascend" ? FaArrowTurnUp : FaArrowTurnDown)({
            className: "size-4 mr-2",
          })}
          {timeOrder === "ascend" ? dictionary.ascend : dictionary.descend}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center">
          <LuCalendarClock className="mr-2 size-4" />
          {dictionary.title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onClick={() => setFilter("timeOrder", "ascend")}
          checked={timeOrder === "ascend"}
        >
          {dictionary.ascend}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => setFilter("timeOrder", "descend")}
          checked={timeOrder === "descend"}
        >
          {dictionary.descend}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
