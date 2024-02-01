"use client";
// Hooks
import { useState } from "react";
// Utils
import { LazyMotion, Variants, domAnimation, m, motion } from "framer-motion";
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

  return (
    <LazyMotion features={domAnimation}>
      <div className="rounded-[40px] flex size-full">
        <m.ul
          className="p-8 m-[0_auto_20px] list-none max-w-[400px] h-full shadow-xl rounded-xl space-y-8 bg-background/80"
          role="tablist"
          variants={tabContentVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5 }}
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
                className="p-4 flex items-center text-lg overflow-hidden relative"
              >
                {tab.icon}
                <span
                  className={cn(
                    "ml-3",
                    activeTabIndex === index && "text-primary"
                  )}
                >
                  {tab.title}
                </span>
              </a>
              {activeTabIndex === index && (
                <motion.span
                  layoutId="indicator"
                  className="absolute h-full right-0 top-0 w-[2px] bg-primary"
                />
              )}
            </li>
          ))}
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
                className="flex-1 rounded-xl ml-10 bg-background/50 p-10"
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
