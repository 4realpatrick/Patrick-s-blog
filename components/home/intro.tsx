"use client";
// Cmp
import { FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Hint from "../hint";
// Hooks
import { useContext } from "react";
// Constant
import { contacts } from "@/components/setting-dropdown";
// Utils
import { showup } from "@/constant/animations";
import { cn } from "@/lib/utils";
import { m } from "framer-motion";
// Context
import { DictionaryContext } from "../dictionary-provider";
// Font
import { Fuzzy_Bubbles } from "next/font/google";

const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

const Intro = () => {
  const {
    pages: { home: dictionary },
    common: commonDictionary,
  } = useContext(DictionaryContext);
  const handleToHabbit = () => {
    const title = document.querySelector(".habbit_intro")!;
    title.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  return (
    <main className="size-full flex items-center justify-around relative">
      <m.div
        className="space-y-4 p-20 bg-background rounded-full"
        {...showup()}
      >
        <m.div
          {...showup({ delay: 1 })}
          className="text-7xl animate-text-gradient bg-gradient-to-r from-[#C6FFDD] via-[#FBD786] to-[#f7797d] bg-[200%_auto] bg-clip-text text-transparent delay-5000 font-bold"
        >
          {commonDictionary.hello}👋
        </m.div>
        <m.div {...showup({ delay: 2 })} className="text-2xl">
          {dictionary.title}
          <span
            className={cn(
              "underlineAnimation text-primary ml-2",
              fuzzyBubbles.className
            )}
          >
            Patrick
          </span>
        </m.div>
        <m.div {...showup({ delay: 3 })} className="text-2xl font-semibold">
          {String.fromCharCode(60)}
          {dictionary.job_name} /{String.fromCharCode(62)}
        </m.div>
        <m.ul className="flex gap-3" {...showup({ delay: 3.5 })}>
          {contacts.map(({ id, href, icon, iconClass, title }) => (
            <Hint key={id} descrption={title}>
              <Link href={href} target="_blank">
                {icon({
                  className: cn("mr-2 size-8", iconClass),
                })}
              </Link>
            </Hint>
          ))}
        </m.ul>
      </m.div>
      <m.div className="hidden md:block" {...showup({ delay: 4 })}>
        <Image
          src="/owner.jpg"
          width={330}
          height={330}
          alt="avatar"
          className="rounded-full object-cover size-[300px]"
        />
      </m.div>
      <m.div
        className="absolute bottom-0 mb-10"
        {...showup({ delay: 4 })}
        onClick={handleToHabbit}
      >
        <FaArrowDown className=" animate-bounce size-10 cursor-pointer" />
      </m.div>
    </main>
  );
};

export default Intro;
