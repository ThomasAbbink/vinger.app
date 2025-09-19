import "./App.css";

import { AnimatePresence, motion } from "motion/react";
import { Rings } from "./components/fingers";
import { useGame } from "./hooks/useGame";

function App() {
  const {
    onTouchChange,
    getColor,
    touches,
    winner,
    showCountdown,
    count,
    showStartText,
  } = useGame();

  return (
    <div
      className="play-area"
      onTouchMove={onTouchChange}
      onTouchStart={onTouchChange}
      onTouchEnd={onTouchChange}
      onTouchCancel={onTouchChange}
    >
      <AnimatePresence>
        {touches &&
          Object.entries(touches).map(([index, touch]) => {
            const isWinner = parseInt(index) === winner;
            return (
              <Rings
                isWinner={isWinner}
                x={touch.clientX}
                y={touch.clientY}
                key={touch.identifier}
                color={getColor(touch.identifier.toString())}
              />
              // <Circle
              //   id={touch.identifier.toString()}
              //   isWinner={isWinner}
              //   x={touch.clientX}
              //   y={touch.clientY}
              //   key={touch.identifier}
              //   color={getColor(touch.identifier.toString())}
              // />
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {showCountdown && (
          <motion.span
            exit={{ scale: 0, transition: { duration: 0.1 } }}
            initial={{ scale: 0 }}
            animate={{ scale: 1.4 - 0.15 * count }}
            className="count text"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showStartText && (
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
