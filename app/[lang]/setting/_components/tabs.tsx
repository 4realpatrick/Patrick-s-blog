"use client";
// Cmp
import { TbLogin2 } from "react-icons/tb";
// Hooks
import { useContext, useState } from "react";
// Utils
import { LazyMotion, Variants, domAnimation, m, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
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
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-1">
        <m.ul
          className="p-8 list-none max-w-[400px] shadow-xl rounded-xl gap-8 bg-background/80 flex flex-col h-full"
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
                  "relative w-full cursor-pointer rounded-lg transition-[background]",
                  isActive && "text-primary",
                  !isActive && "hover:bg-primary/10"
                )}
                role="presentation"
              >
                <a
                  onClick={() => setActiveTabIndex(index)}
                  className="p-4 flex items-center text-lg overflow-hidden relative"
                >
                  {tab.icon({ className: "size-6" })}
                  <span className={cn("ml-3", isActive && "text-primary")}>
                    {tab.title}
                  </span>
                </a>
                {isActive && (
                  <motion.span
                    layoutId="indicator"
                    className="absolute h-full right-0 top-0 w-[2px] bg-primary"
                  />
                )}
              </li>
            );
          })}
          <div className="flex-1 flex flex-col justify-end">
            <li
              className="w-full text-lg flex items-center p-4 self-end hover:bg-primary/10 transition-[background] rounded-lg cursor-pointer"
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
                className="flex-1 rounded-xl ml-10 bg-background/50 p-10 w-full"
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
    </LazyMotion>
  );
};

export default SettingTab;
