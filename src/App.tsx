import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useColors } from "./hooks/useColors";
import { AnimatePresence, motion } from "motion/react";

import clsx from "clsx";

function App() {
  const [touches, setTouches] = useState<React.TouchList>();
  const [count, setCount] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const { getColor, resetColors } = useColors();

  const onChange = (event: React.TouchEvent<HTMLDivElement>) => {
    if (winner === null) {
      setTouches(event.touches);
    }
  };

  const reset = useCallback(() => {
    setWinner(null);
    setTouches(undefined);
    resetColors();
  }, [resetColors]);

  useEffect(() => {
    const id = setInterval(() => {
      if (isCountingDown) {
        setCount((current) => current - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isCountingDown, touches?.length]);

  useEffect(() => {
    setCount(3);
    if (winner === null) {
      if (touches?.length && touches?.length > 1) {
        setIsCountingDown(true);
      } else {
        setIsCountingDown(false);
      }
    }
  }, [touches?.length, winner]);

  //reset to initial
  useEffect(() => {
    if (winner !== null) {
      const timeout = setTimeout(() => {
        reset();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [winner, reset]);

  useEffect(() => {
    if (count === 0 && touches?.length !== undefined) {
      setIsCountingDown(false);
      const winner = Math.floor(Math.random() * touches?.length || 0);
      setWinner(winner);
    }
  }, [count, touches?.length]);

  return (
    <div
      className="play-area"
      onTouchMove={onChange}
      onTouchStart={onChange}
      onTouchEnd={onChange}
      onTouchCancel={onChange}
    >
      <AnimatePresence>
        {touches &&
          Object.entries(touches).map(([index, touch]) => {
            const isWinner = parseInt(index) === winner;
            return (
              <motion.div
                exit={{ scale: 0, transition: { duration: 0.5 } }}
                initial={{ scale: 0, rotate: isWinner ? 360 : 0 }}
                animate={{
                  scale: isWinner ? 1.2 : 1,
                  rotate: isWinner ? 360 : 0,
                }}
                transition={{
                  rotate: {
                    repeat: isWinner ? Infinity : 0,
                    duration: 1,
                    ease: "linear",
                  },
                }}
                key={touch.identifier}
                className={clsx("circle", isWinner && "winner neon")}
                style={{
                  left: touch.clientX,
                  top: touch.clientY,
                  //@ts-expect-error this does work
                  "--bgColor": getColor(touch.identifier),
                }}
              ></motion.div>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {isCountingDown && count > 0 && (
          <motion.span
            exit={{ scale: 0, transition: { duration: 0.1 } }}
            initial={{ scale: 0 }}
            animate={{ scale: 0.7 + 0.2 * count }}
            className="count text"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isCountingDown && !winner && (!touches || touches?.length <= 1) && (
          <motion.span
            exit={{ scale: 0, transition: { duration: 0.1 } }}
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            className="text"
          >
            Klaar om te vingeren?
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
