import { motion, Variants } from "motion/react";
import { Finger } from "./finger-types";
import React from "react";

export const Hash = ({ x, y, color, isWinner }: Finger) => {
  const lineCount = 8;

  const horizontalLineVariants: Variants = {
    hidden: {
      pathLength: 0,
      translateX: -100,
    },
    exit: (custom: number) => ({
      pathLength: 0,
      transition: {
        delay: custom * 0.025,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    visible: (custom: number) => ({
      pathLength: 1,
      transition: {
        pathLength: {
          delay: custom * 0.05,
          duration: 1,
          ease: "easeInOut",
        },
      },
    }),
    winner: {
      translateX: [-100, 100],
      pathLength: 1,
      transition: {
        duration: 2,
        bounce: 0.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const verticalLineVariants: Variants = {
    hidden: {
      pathLength: 0,
      translateY: -100,
    },
    exit: (custom: number) => ({
      pathLength: 0,
      transition: {
        delay: custom * 0.025,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    visible: () => ({
      pathLength: 1,
      translateY: -100,
      transition: {
        pathLength: {
          duration: 0.05,
          ease: "easeInOut",
        },
      },
    }),
    winner: {
      translateY: [-100, 100],
      pathLength: 1,
      transition: {
        duration: 2,
        bounce: 0.5,
        repeat: Infinity,
        repeatType: "loop",
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
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={"0 0 100 100"}
      variants={svgVariants}
      animate={isWinner && "winner"}
      exit="exit"
      style={{
        x,
        y,
        translate: "-50svw -50svh",
        position: "absolute",
        width: "8rem",
        height: "8rem",
        borderRadius: "100%",
      }}
    >
      {Array.from({ length: lineCount }).map((_, index) => {
        const x = (90 / lineCount) * index + 10;
        return (
          <React.Fragment key={`hash-${index}`}>
            <motion.path
              fill="none"
              custom={index}
              variants={verticalLineVariants}
              initial="hidden"
              animate={isWinner ? "winner" : "visible"}
              exit="exit"
              d={`
                M ${x},-100
                L ${x},0
                C ${x},10 ${x - 10},10 ${x},20
                Q ${x + 10},30 ${x},40
                T ${x},60
                T ${x},80
                C ${x - 10},90 ${x},90 ${x},100
                L ${x},200
                `}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke={color}
              strokeWidth="2"
              key={`vertical-line-${index}`}
            />

            <motion.path
              fill="none"
              custom={index}
              variants={horizontalLineVariants}
              initial="hidden"
              animate={isWinner ? "winner" : "visible"}
              exit="exit"
              d={`
                M -100,${x}
                L 0,${x}
                C 10,${x}, 10,${x - 10} 20,${x}
                Q 30,${x + 10}, 40,${x}
                T 60,${x}
                T 80,${x}
                C 90,${x - 10} 90,${x} 100,${x}
                L 200,${x}
                `}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke={color}
              strokeWidth="2"
              key={`horizontal-line-${index}`}
            ></motion.path>
          </React.Fragment>
        );
      })}
    </motion.svg>
  );
};
