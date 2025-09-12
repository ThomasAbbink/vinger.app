import { motion, Variants } from "motion/react";

type Props = {
  x: number;
  y: number;
  isWinner: boolean;
  color: string;
};

export const Vinger = ({ x, y, color, isWinner }: Props) => {
  const ringVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      rotate: 0,
    },
    exit: (custom: number) => ({
      pathLength: 0,
      opacity: 0,
      rotate: custom * -360,
      transition: {
        delay: custom * 0.01,
        duration: 0.1,
        ease: "easeOut",
      },
    }),
    winner: (custom: number) => ({
      rotate: 360,
      pathLength: 0.8,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.1,
          ease: "easeOut",
        },
        rotate: {
          duration: 1.5 - custom * 0.075,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
        scale: {
          duration: 0.2,
          ease: "easeOut",
          bounce: 0.8,
        },
      },
    }),
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 1.0 - custom * 0.1,
          duration: 0.4,
          ease: "easeInOut",
        },
        opacity: {
          delay: 0,
          duration: 0.1,
          ease: "easeOut",
        },
      },
    }),
    scale: {
      viewBox: "-100 -150 200 200",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const svgVariants: Variants = {
    hidden: {
      scale: 1,
    },
    winner: {
      scale: 1.2,
      transition: {
        scale: {
          duration: 0.2,
          bounce: 1,
        },
      },
    },
  };

  return (
    <motion.svg
      viewBox={"0 0 100 100"}
      fill="none"
      className={"vinger"}
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      variants={svgVariants}
      animate={isWinner && "winner"}
      exit="exit"
      style={{
        x,
        y,
        translate: "-50svw -50svh",
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.circle
          cx="50"
          cy="50"
          r={3 + index * 5}
          initial="hidden"
          animate={isWinner ? "winner" : "visible"}
          exit="exit"
          variants={ringVariants}
          custom={index}
          style={{
            rotate: isWinner ? 0 : 18 * index,
            stroke: color,
            strokeWidth: "2",
          }}
        />
      ))}
    </motion.svg>
  );
};
