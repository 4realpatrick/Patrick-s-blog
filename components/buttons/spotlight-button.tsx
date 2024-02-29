import { m, LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useRef, PropsWithChildren } from "react";

const SpotlightButton = ({ children, ...rest }: PropsWithChildren<{}>) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spotlightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { width } = (e.target as HTMLElement)?.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spotlightRef.current!.animate(
        { left },
        { duration: 250, fill: "forwards" }
      );
    };

    const handleMouseLeave = () => {
      spotlightRef.current!.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef.current?.addEventListener("mousemove", handleMouseMove);
    btnRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef.current?.removeEventListener("mousemove", handleMouseMove);
      btnRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        whileTap={{ scale: 0.985 }}
        className="relative w-full max-w-xs overflow-hidden rounded-lg bg-background px-4 py-3 text-lg font-medium text-white border"
        {...rest}
        ref={btnRef}
      >
        <span className="pointer-events-none relative z-10 mix-blend-difference w-full inline-block text-nowrap">
          {children}
        </span>
        <span
          ref={spotlightRef}
          className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-foreground"
        />
      </m.button>
    </LazyMotion>
  );
};

export default SpotlightButton;
