import { AnimationProps } from "framer-motion";

export const showup = (
  props: {
    duration?: number;
    delay?: number;
  } = {}
): AnimationProps => {
  const { duration = 1, delay = 0 } = props;
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, delay },
  };
};

export const moveTo = (props: {
  orientation: "x" | "y";
  distance: number;
  duration?: number;
}): AnimationProps => {
  const { orientation, distance, duration = 1 } = props;
  const result: AnimationProps = {
    initial: {
      [orientation]: 0,
    },
    animate: {
      [orientation]: distance,
    },
    transition: {
      duration,
      repeatType: "mirror",
      repeat: Infinity,
    },
  };
  return result;
};
