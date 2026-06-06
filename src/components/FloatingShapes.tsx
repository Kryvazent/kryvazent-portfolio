"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingShapesProps {
  className?: string;
}

const FloatingShapes = ({ className = "absolute inset-0" }: FloatingShapesProps) => {
  return (
    <div className={`${className} pointer-events-none overflow-hidden z-0`}>
      {/* 3D Octahedron CSS Shape - Large Top Right */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 180, 0],
          y: [0, -40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 right-[10%] w-12 h-12 md:w-24 md:h-24 opacity-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {[0, 90, 180, 270].map((rotate, i) => (
            <div
              key={i}
              className="absolute w-0 h-0 border-l-[48px] border-l-transparent border-r-[48px] border-r-transparent border-b-[82px] border-b-primary/40"
              style={{
                transform: `rotateY(${rotate}deg) translateZ(0px) rotateX(35deg)`,
                transformOrigin: "50% 100%",
              }}
            />
          ))}
          {[0, 90, 180, 270].map((rotate, i) => (
            <div
              key={i + 4}
              className="absolute w-0 h-0 border-l-[48px] border-l-transparent border-r-[48px] border-r-transparent border-t-[82px] border-t-primary/20"
              style={{
                transform: `rotateY(${rotate}deg) translateZ(0px) rotateX(-35deg)`,
                transformOrigin: "50% 0%",
                top: "82px",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* 3D Cube - Middle Left */}
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 left-[8%] w-12 h-12 md:w-20 md:h-20 opacity-[0.08]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Front */}
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "translateZ(40px)" }} />
          {/* Back */}
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateY(180deg) translateZ(40px)" }} />
          {/* Left */}
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateY(-90deg) translateZ(40px)" }} />
          {/* Right */}
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateY(90deg) translateZ(40px)" }} />
          {/* Top */}
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateX(90deg) translateZ(40px)" }} />
          {/* Bottom */}
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateX(-90deg) translateZ(40px)" }} />
        </div>
      </motion.div>

      {/* 3D Tetrahedron (Pyramid) - Bottom Right */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateZ: [0, 180, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[15%] right-[15%] w-12 h-12 md:w-20 md:h-20 opacity-[0.06]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
           {[0, 120, 240].map((rotate, i) => (
            <div
              key={i}
              className="absolute w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-primary/40"
              style={{
                transform: `rotateY(${rotate}deg) translateZ(0px) rotateX(30deg)`,
                transformOrigin: "50% 100%",
              }}
            />
          ))}
          {/* Base */}
          <div className="absolute w-full h-full bg-primary/10 border border-primary/30" style={{ transform: "rotateX(90deg) translateZ(-35px)" }} />
        </div>
      </motion.div>

      {/* Small Floating Octahedrons */}
      {[
        { top: '20%', left: '25%', delay: 0, size: 'w-4 h-4' },
        { top: '60%', left: '40%', delay: 2, size: 'w-6 h-6' },
        { top: '80%', left: '10%', delay: 5, size: 'w-5 h-5' },
        { top: '15%', right: '30%', delay: 1, size: 'w-4 h-4' },
        { top: '70%', right: '25%', delay: 4, size: 'w-6 h-6' },
      ].map((pos, idx) => (
        <motion.div
          key={idx}
          animate={{
            rotateY: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15 + idx * 2,
            repeat: Infinity,
            delay: pos.delay,
            ease: "linear",
          }}
          className={`absolute ${pos.size} opacity-[0.05]`}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            transformStyle: "preserve-3d"
          }}
        >
          <div className="relative w-full h-full bg-primary/20 border border-primary/40 rotate-45" />
        </motion.div>
      ))}

      {/* Tech Rings */}
      <motion.div
        animate={{
          rotateZ: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-[15%] w-32 h-32 md:w-64 md:h-64 border border-primary/5 rounded-full opacity-[0.05]"
      >
        <div className="absolute inset-0 border-t border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute inset-8 border-b border-primary/10 rounded-full animate-reverse-spin" />
      </motion.div>

      <motion.div
        animate={{
          rotateZ: [360, 0],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-[10%] w-24 h-24 md:w-48 md:h-48 border border-primary/5 rounded-full opacity-[0.03]"
      >
        <div className="absolute inset-0 border-l border-primary/20 rounded-full animate-spin-slow" />
      </motion.div>
    </div>
  );
};

export default FloatingShapes;
