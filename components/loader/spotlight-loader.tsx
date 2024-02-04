import { motion, useAnimate } from "framer-motion";
import { ElementRef, useEffect, useRef } from "react";

export default function SpotlightLoader() {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (containerRef.current) {
      const animateLoader = async () => {
        await animate(
          [
            [scope.current, { x: 0, width: "100%" }],
            [
              scope.current,
              { x: containerRef.current?.offsetWidth, width: "0%" },
              { delay: 0.6 },
            ],
          ],
          {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.8,
          }
        );
      };
      animateLoader();
    }
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <motion.div ref={scope} className="absolute h-full bg-black" />
      <h1 className="text-white whitespace-nowrap mix-blend-difference py-4 px-6 text-xl m-[21px]">
        <i>spotlight</i>
      </h1>
    </div>
  );
}
