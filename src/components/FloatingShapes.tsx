"use client";

import React from "react";
import { motion } from "framer-motion";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 3D Octahedron CSS Shape */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 180, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 right-1/4 w-16 h-16 md:w-32 md:h-32 opacity-20"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Faces of the Octahedron */}
          {[0, 90, 180, 270].map((rotate, i) => (
            <div
              key={i}
              className="absolute w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-b-[110px] border-b-primary/40"
              style={{
                transform: `rotateY(${rotate}deg) translateZ(0px) rotateX(35deg)`,
                transformOrigin: "50% 100%",
              }}
            />
          ))}
          {[0, 90, 180, 270].map((rotate, i) => (
            <div
              key={i + 4}
              className="absolute w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-t-[110px] border-t-primary/20"
              style={{
                transform: `rotateY(${rotate}deg) translateZ(0px) rotateX(-35deg)`,
                transformOrigin: "50% 0%",
                top: "110px",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Another floating tech element */}
      <motion.div
        animate={{
          rotateZ: [0, 360],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/4 w-24 h-24 md:w-48 md:h-48 border border-primary/10 rounded-full opacity-10"
      >
        <div className="absolute inset-0 border-t-2 border-primary/30 rounded-full animate-spin-slow" />
        <div className="absolute inset-4 border-b-2 border-primary/20 rounded-full animate-reverse-spin" />
      </motion.div>
    </div>
  );
};

export default FloatingShapes;
