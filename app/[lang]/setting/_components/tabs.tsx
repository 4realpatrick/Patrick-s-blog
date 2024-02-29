"use client";
// Cmp
import { TbLogin2 } from "react-icons/tb";
// Hooks
import { useContext, useState } from "react";
// Utils
import { Variants, m, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
// Types
import { IconType } from "react-icons/lib";
// Context
import {
  DictionaryContext,
  LocaleContext,
} from "@/components/dictionary-provider";

// Types
interface ITabsProps {
  tabs: {
    id: string;
    title: string;
    icon: IconType;
    content: JSX.Element;
  }[];
  defaultIndex?: number;
}
// Constant
const tabContentVariants: Variants = {
  initial: {
    x: -50,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const SettingTab: React.FC<ITabsProps> = ({ tabs, defaultIndex = 0 }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);
  const { common } = useContext(DictionaryContext);
  const locale = useContext(LocaleContext);
  const session = useSession();
  return (
    <div className="flex items-center flex-1 flex-col space-y-8 pt-4 lg:flex-row lg:space-x-12 lg:space-y-0 lg:pt-8 lg:items-stretch pb-10">
      <m.ul
        className="flex gap-2 lg:flex-col lg:gap-4 w-full lg:w-auto bg-background lg:shadow-md rounded-md lg:py-4 lg:px-6"
        role="tablist"
        variants={tabContentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;
          return (
            <li
              key={tab.id}
              className={cn(
                "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 lg:px-4 py-6 justify-start relative cursor-pointer",
                !isActive && "hover:bg-muted"
              )}
              role="presentation"
              onClick={() => setActiveTabIndex(index)}
            >
              <a className="p-4 flex items-center text-base overflow-hidden relative font-normal">
                {tab.icon({ className: "size-6" })}
                <span className="ml-3">{tab.title}</span>
              </a>
              {isActive && (
                <motion.span
                  layoutId="indicator"
                  className="absolute w-full h-[2px] bottom-0 lg:h-full lg:left-0 lg:w-[2px] bg-primary rounded-md"
                />
              )}
            </li>
          );
        })}
        {session.data?.user && (
          <div className="flex-1 flex flex-col justify-end items-end lg:items-start pr-8 lg:pr-0">
            <li
              className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 lg:px-4 py-6 justify-start relative cursor-pointer hover:bg-muted lg:w-full px-4"
              onClick={() =>
                signOut({
                  callbackUrl: `/${locale}/login`,
                })
              }
            >
              <TbLogin2 className="size-6 mr-3" />
              {common.signout}
            </li>
          </div>
        )}
      </m.ul>

      {tabs.map(
        (tab, index) =>
          activeTabIndex === index && (
            <m.div
              role="tabpanel"
              id={tab.id}
              key={tab.id}
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex-1 rounded-xl ml-10 px-10 w-full bg-background/50"
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
            >
              {tab.content}
            </m.div>
          )
      )}
    </div>
  );
};

export default SettingTab;
