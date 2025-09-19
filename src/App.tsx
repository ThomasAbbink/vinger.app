import "./App.css";

import { AnimatePresence, motion } from "motion/react";
import { useGame } from "./hooks/useGame";

function App() {
  const {
    count,
    getColor,
    getFingerComponent,
    onTouchChange,
    showCountdown,
    showStartText,
    touches,
    winner,
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
            const FingerComponent = getFingerComponent(
              touch.identifier.toString()
            );
            return (
              <FingerComponent
                key={touch.identifier}
                isWinner={isWinner}
                x={touch.clientX}
                y={touch.clientY}
                color={getColor(touch.identifier.toString())}
              />
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
