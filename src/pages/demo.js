import { useEffect, useRef } from "react";

const hours = Array(24).fill(null).map((v, i) => i);

export default () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = document.getElementById("my-canvas");
    const ctx = canvas.getContext("2d");
    console.log(ctx);
    ctx.start
    hours.forEach();
  }, []);

  return (
    <div className="canvas-wrapper">
      <canvas id="my-canvas" width={600} height={1000} ref={canvasRef}></canvas>
    </div>
  );
};
