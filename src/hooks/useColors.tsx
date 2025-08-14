import { useRef } from "react";

export const useColors = () => {
  const pickedColors = useRef<Map<string, string>>(new Map());

  const getColor = (index: string): string => {
    if (pickedColors.current.has(index)) {
      return pickedColors.current.get(index) || "";
    }
    const availableColors = colors.filter((color) => {
      return !Array.from(pickedColors.current.values()).includes(color);
    });
    const color =
      availableColors[Math.floor(Math.random() * availableColors.length)];
    pickedColors.current.set(index, color);

    return color;
  };

  const resetColors = () => {
    pickedColors.current = new Map();
  };

  return { getColor, resetColors };
};

const colors = [
  "#f9ae18", // Nomads - Fakirs
  "#7a1166",
  "#1d7ddb", // Mermaids - Swarmlings
  "#278139", // Auren - Witches
  "#8f99A1", // Dwarves - Engineers
  "#971923", // Chaos magicians - Giants
  "#70421d", // Cultists - Halflings
  "#f47f07", // Dragon lords - Acolytes
  "#32e0e8", // Yeti - Ice maidens
  "#8ecae6", // Light blue
  "#e63946", // Light red
  "#fb6f92", // soft pink
  "#d9ed92", // Meadow green
  "#8338ec", // Very purple
];
