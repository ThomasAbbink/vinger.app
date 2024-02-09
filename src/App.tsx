import { useEffect, useState } from "react";
import "./App.css";
import { useColors } from "./hooks/useColors";

import clsx from "clsx";

function App() {
  const [touches, setTouches] = useState<TouchList>();
  const [count, setCount] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const { getColor, resetColors } = useColors();

  const onChange = (event) => {
    event.preventDefault();
    if (winner === null) {
      setTouches(event.touches);
    }
  };

  useEffect(() => {
    if (touches?.length === 0) {
      resetColors();
    }
  }, [touches, resetColors]);

  useEffect(() => {
    const id = setInterval(() => {
      if (isCountingDown) {
        setCount((current) => current - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isCountingDown]);

  useEffect(() => {
    setCount(3);
    if (winner === null) {
      if (touches?.length > 1) {
        setIsCountingDown(true);
      } else {
        setIsCountingDown(false);
      }
    }
  }, [touches?.length, winner]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWinner(null);
      setTouches(undefined);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [winner]);

  useEffect(() => {
    if (count === 0) {
      setIsCountingDown(false);
      const winner = Math.floor(Math.random() * touches?.length);
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
      {touches &&
        Object.entries(touches).map(([index, touch]) => {
          return (
            <div
              key={index}
              className={clsx(
                "circle",
                parseInt(index) === winner && "winner neon"
              )}
              style={{
                left: touch.clientX,
                top: touch.clientY,
                "--bgColor": getColor(index),
              }}
            ></div>
          );
        })}
      {isCountingDown && count > 0 && (
        <span className="count text">{count}</span>
      )}
      {!isCountingDown && !winner && (
        <span className="text">Klaar om te vingeren?</span>
      )}
    </div>
  );
}

export default App;
