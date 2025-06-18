import React, { useRef, useEffect } from "react";

export function WavyLine({ className = "" }) {
  const path = useRef(null);
  const parentRef = useRef(null);

  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  useEffect(() => {
    setSvgPath(progress);
  }, );

  const setSvgPath = (progress) => {
    const width = parentRef.current?.clientWidth ?? window.innerWidth;
    path.current?.setAttributeNS(
      null,
      "d",
      `M0 50 Q${width * x} ${50 + progress}, ${width} 50`
    );
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const handleMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const handleMouseMove = (e) => {
    const { movementY, clientX } = e;
    const pathBound = path.current?.getBoundingClientRect();

    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setSvgPath(progress);
    }
  };

  const handleMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setSvgPath(newProgress);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div
      className={`relative w-full h-px ${className}`}
      ref={parentRef}
    >
      <div
        className="relative z-10 h-10 -top-5 w-full"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <svg className="absolute w-full h-[100px] -top-[50px]">
        <title>Wavy Line</title>
        <path
          ref={path}
          className="stroke-current dark:text-neutral-200 text-neutral-800 stroke-[1px] fill-none"
        />
      </svg>
    </div>
  );
}
