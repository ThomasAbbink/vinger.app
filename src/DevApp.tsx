import "./App.css";

import { Hash } from "./components/fingers/Hash";

function DevApp() {
  const touch = {
    identifier: "1",
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2,
  };
  return (
    <div className="play-area">
      <Hash x={touch.clientX} y={touch.clientY} color="white" isWinner={true} />
    </div>
  );
}

export default DevApp;
