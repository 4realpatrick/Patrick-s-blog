import { cn } from "@/lib/utils";
import { LazyMotion, domAnimation, m } from "framer-motion";

const DotLoader = ({ className = "" }: { className?: string }) => {
  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "w-full py-4 flex items-center justify-center space-x-2 h-10",
          className
        )}
      >
        {[...new Array(5)].map((v, i) => (
          <m.span
            key={i}
            className="w-2 bg-primary inline-block"
            initial={{ height: "10px" }}
            animate={{ height: "30px" }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.1 * (i + 1),
            }}
          ></m.span>
        ))}
      </div>
    </LazyMotion>
  );
};

export default DotLoader;
