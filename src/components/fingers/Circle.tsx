import clsx from "clsx";
import { Finger } from "./finger-types";
import { motion } from "motion/react";

export const Circle = ({ isWinner, x, y, id, color }: Finger) => {
  return (
    <motion.div
      exit={{ scale: 0, transition: { duration: 0.2 } }}
      initial={{
        scale: 0,
        borderRadius: "100%",
        rotate: isWinner ? 360 : 0,
      }}
      animate={{
        scale: isWinner ? 1.2 : 1,
        rotate: isWinner ? 360 : 0,
        borderRadius: isWinner ? ["40%", "5%", "40%", "5%", "40%"] : "100%",
      }}
      transition={{
        scale: {
          bounce: 0.5,
          type: "spring",
          visualDuration: 0.15,
        },
        borderRadius: {
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 0,
          duration: 2,
          ease: "linear",
        },
        rotate: {
          // times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "linear",
        },
      }}
      key={id}
      className={clsx("circle", isWinner && "winner neon")}
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
    ></motion.div>
  );
};
