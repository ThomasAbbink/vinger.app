import { useCallback, useEffect, useState } from "react";
import { useColors } from "./useColors";

export const useGame = () => {
  const [touches, setTouches] = useState<React.TouchList>();
  const { getColor, resetColors } = useColors();
  const [count, setCount] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);

  const onTouchChange = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (isIosSafari()) {
        // prevent ios from foing long press type things
        event.preventDefault();
      }
      if (winner === null) {
        setTouches(event.touches);
      }
    },
    [winner]
  );

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

  return {
    touches,
    setTouches,
    count,
    setCount,
    isCountingDown,
    setIsCountingDown,
    onTouchChange,
    getColor,
    winner,
    showCountdown: isCountingDown && count > 0,
    showStartText:
      !isCountingDown && !winner && (!touches || touches?.length <= 1),
  };
};

function isIosSafari() {
  const ua = (window.navigator && navigator.userAgent) || "";
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  return iOSSafari;
}
