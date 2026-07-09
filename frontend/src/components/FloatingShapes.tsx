"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingShapesProps {
  className?: string;
}

const floatingBits = [
  { top: "15%", left: "10%", size: "w-1 h-1" },
  { top: "45%", left: "80%", size: "w-2 h-2" },
  { top: "85%", left: "30%", size: "w-1 h-1" },
  { top: "10%", left: "70%", size: "w-2 h-2" },
  { top: "60%", left: "15%", size: "w-1 h-1" },
  { top: "75%", left: "65%", size: "w-2 h-2" },
];

const FloatingShapes = ({ className = "absolute inset-0" }: FloatingShapesProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`${className} pointer-events-none overflow-hidden z-0`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 800, opacity: [0, 0.16, 0] }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            delay: i * 4,
            ease: "linear",
          }}
          className="absolute h-32 w-px bg-gradient-to-b from-transparent via-primary to-transparent"
          style={{ left: `${22 + i * 26}%`, top: 0 }}
        />
      ))}

      {floatingBits.map((pos, idx) => (
        <motion.div
          key={idx}
          style={{
            x: mousePos.x * (idx % 2 === 0 ? 1 : -1),
            y: mousePos.y * (idx % 3 === 0 ? 0.8 : -0.8),
            top: pos.top,
            left: pos.left,
          }}
          animate={{
            opacity: [0.08, 0.24, 0.08],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 5 + idx,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${pos.size} bg-primary rounded-full blur-[1px]`}
        />
      ))}

      <motion.div
        animate={{
          rotateZ: [0, 360],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 46,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-[8%] h-32 w-32 rounded-full border border-primary/10 opacity-30 md:h-56 md:w-56"
      >
        <div className="absolute inset-8 rounded-full border border-primary/10" />
      </motion.div>
    </div>
  );
};

export default FloatingShapes;
