import { Finger } from "./finger-types";
import { motion, Variants } from "motion/react";

export const Azul = ({ x, y, color, isWinner }: Finger) => {
  const svgVariants: Variants = {
    hidden: {
      viewBox: "0 0 10 10",
      opacity: 0,
    },
    exit: {
      viewBox: "0 0 300 300",
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.2,
        },
      },
    },
    visible: {
      viewBox: "0 0 100 100",
      opacity: 1,
      transition: {
        opacity: {
          duration: 1,
        },
        viewBox: {
          duration: 1,
          ease: "easeOut",
        },
      },
    },
    winner: {
      viewBox: "0 0 100 100",
      opacity: 1,
      scale: 1.2,
    },
  };
  const tileVariants: Variants = {
    default: {
      fill: color,
      stroke: color,
    },
    winner: {
      stroke: "var(--bgColor)",
      fill: "var(--bgColor)",
    },
  };

  const borderVariants: Variants = {
    default: {
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: {
          delay: 1,
          duration: 0.2,
        },
        pathLength: {
          delay: 1,
          duration: 1,
        },
      },
    },
    winner: {
      fill: color,
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: {
          delay: 1,
          duration: 0.2,
        },
        pathLength: {
          delay: 1,
          duration: 1,
        },
      },
    },
  };

  return (
    <motion.svg
      style={{
        x,
        y,
        translate: "-50svw -50svh",
        position: "absolute",
        width: "9rem",
        height: "9rem",
      }}
      animate={isWinner ? "winner" : "visible"}
      variants={svgVariants}
      initial="hidden"
      exit="exit"
      fill={"none"}
    >
      <defs>
        <motion.linearGradient
          id={`azul-gradient-${color}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <motion.stop
            offset="0"
            stopColor={color}
            animate={isWinner ? "winner" : "default"}
          />
          <motion.stop
            offset="1"
            stopColor="transparent"
            animate={isWinner ? "winner" : "default"}
          />
        </motion.linearGradient>
        <motion.path
          style={{
            transformBox: "view-box",
          }}
          variants={tileVariants}
          animate={isWinner ? "winner" : "default"}
          id={`azul-rect-${color}`}
          d="M 50 0 L 60 20 L 50 45 L 40 20 Z"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></motion.path>
      </defs>
      // border box with rounded corners
      <motion.rect
        variants={borderVariants}
        animate={isWinner ? "winner" : "default"}
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        exit={{
          pathLength: 0,
        }}
        width="98"
        height="98"
        x="1"
        y="1"
        rx="16"
        ry="16"
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="transparent"
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 22.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 67.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 112.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 157.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 202.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 247.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 292.5,
        }}
      />
      <motion.use
        href={`#azul-rect-${color}`}
        style={{
          transformBox: "view-box",
          rotate: 337.5,
        }}
      />
    </motion.svg>
  );
};
