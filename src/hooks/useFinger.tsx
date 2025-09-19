import { useCallback, useRef } from "react";
import { Circle, Rings } from "../components/fingers";
import { Hash } from "../components/fingers/Hash";
import { Azul } from "../components/fingers/Azul";

export const useFinger = () => {
  const pickedFingers = useRef<Map<string, FingerComponent>>(new Map());

  const getFingerComponent = (index: string): FingerComponent => {
    const current = pickedFingers.current.get(index);
    if (current) {
      return current;
    }

    const fingerComponent =
      fingerComponents[Math.floor(Math.random() * fingerComponents.length)];
    pickedFingers.current.set(index, fingerComponent);

    return fingerComponent;
  };

  const resetFingerComponents = useCallback(() => {
    pickedFingers.current = new Map();
  }, []);

  return { getFingerComponent, resetFingerComponents };
};

const fingerComponents = [Rings, Circle, Hash, Azul] as const;
type FingerComponent = (typeof fingerComponents)[number];
