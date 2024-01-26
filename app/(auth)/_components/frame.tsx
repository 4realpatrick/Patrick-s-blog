"use client";
import { motion } from "framer-motion";
import { showup } from "@/constant/animations";
interface FrameProps {
  title: string;
  description: string | React.ReactNode;
  children: string | React.ReactNode;
}

export const Frame: React.FC<FrameProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <motion.h1
        className="text-5xl font-bold tracking-widest font-[Overpass]"
        {...showup({ duration: 0.5 })}
      >
        {title}
      </motion.h1>
      <motion.div
        className="mt-4 text-lg"
        {...showup({ duration: 0.5, delay: 0.5 })}
      >
        {description}
      </motion.div>
      <motion.div
        className="mt-8 space-y-8"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
};
