// Cmp
import Link from "next/link";
// Hooks
import { m, useTransform, useScroll } from "framer-motion";
import { useContext, useRef } from "react";
// Context
import { DictionaryContext } from "../dictionary-provider";
// Types
type CardType = {
  url: string;
  title: string;
  id: number;
  link: string;
};
// Constant
const cards: CardType[] = [
  {
    url: "/games/cod.jpeg",
    title: "Call Of Duty",
    id: 1,
    link: "https://store.steampowered.com/app/1938090/Call_of_Duty/",
  },
  {
    url: "/games/cs.jpeg",
    title: "Counter Strike",
    id: 2,
    link: "https://store.steampowered.com/app/730/CounterStrike_2/",
  },
  {
    url: "/games/darktide.jpg",
    title: "Warhammer 40,000: Darktide",
    id: 3,
    link: "https://store.steampowered.com/app/1361210/Warhammer_40000_Darktide/",
  },
  {
    url: "/games/pal-world.jpeg",
    title: "Pal World",
    id: 4,
    link: "https://store.steampowered.com/app/1623730/Palworld/",
  },
  {
    url: "/games/resident.jpg",
    title: "Resident Evil",
    id: 5,
    link: "https://store.steampowered.com/app/2050650/Resident_Evil_4/",
  },
  {
    url: "/games/ron.jpeg",
    title: "Ready Or Not",
    id: 6,
    link: "https://store.steampowered.com/app/1144200/Ready_or_Not/",
  },
  {
    url: "/games/diablo.jpeg",
    title: "Diablo IV",
    id: 7,
    link: "https://store.steampowered.com/app/2344520/Diablo_IV/",
  },
];

const Habbit = () => {
  const {
    pages: { home },
  } = useContext(DictionaryContext);

  return (
    <div>
      <div className="flex p-5 items-center justify-center habbit_intro">
        <span className="font-semibold uppercase">{home.habbit_intro}</span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <m.section
      ref={containerRef}
      className="relative h-[300vh]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <m.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </m.div>
      </div>
    </m.section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <Link href={card.link} target="_blank">
      <div
        key={card.id}
        className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-10 grid place-content-center px-4">
          <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-5xl font-black uppercase text-white backdrop-blur-lg">
            {card.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Habbit;
