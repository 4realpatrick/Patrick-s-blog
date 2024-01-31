"use client";
// Hooks
import { useState } from "react";
// Utils
import { Variants, motion } from "framer-motion";
import { cn } from "@/lib/utils";
// Types
interface ITabsProps {
  tabs: {
    id: string;
    title: string;
    icon?: React.ReactNode;
    content: JSX.Element;
  }[];
  defaultIndex?: number;
}
// Constant
const tabVariant: Variants = {
  active: {
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  inactive: {
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};
const tabContentVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const SettingTab: React.FC<ITabsProps> = ({ tabs, defaultIndex = 0 }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  return (
    <div className="rounded-[40px] flex size-full">
      <ul
        className="p-8 m-[0_auto_20px] list-none max-w-[400px] h-full shadow-xl rounded-xl space-y-4 bg-background/80"
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={cn(
              "relative w-full cursor-pointer",
              activeTabIndex === index && "text-primary"
            )}
            role="presentation"
          >
            <a
              onClick={() => setActiveTabIndex(index)}
              className="p-4 flex items-center text-xl overflow-hidden relative"
            >
              {tab.icon}
              <span
                className={cn(
                  "ml-2",
                  activeTabIndex === index && "text-primary"
                )}
              >
                {tab.title}
              </span>
            </a>
            {activeTabIndex === index && (
              <motion.span
                layoutId="indicator"
                className="absolute inset-0 bg-primary/20 rounded-lg"
              />
            )}
          </li>
        ))}
      </ul>
      {tabs.map(
        (tab, index) =>
          activeTabIndex === index && (
            <motion.div
              role="tabpanel"
              id={tab.id}
              key={tab.id}
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex-1 rounded-xl ml-10 bg-background/50 p-10"
              transition={{
                duration: 0.5,
              }}
            >
              {tab.content}
            </motion.div>
          )
      )}
    </div>
  );
};

export default SettingTab;
