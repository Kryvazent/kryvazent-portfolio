"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface FloatingShapesProps {
  className?: string;
}

const FloatingShapes = ({ className = "absolute inset-0" }: FloatingShapesProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`${className} pointer-events-none overflow-hidden z-0`}>
      {/* 3D Octahedron CSS Shape - Large Top Right */}
      <motion.div
        style={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 180, 0],
        }}
        transition={{
          rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 30, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-10 right-[10%] w-12 h-12 md:w-24 md:h-24 opacity-10"
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
        style={{
          x: -mousePos.x * 0.8,
          y: -mousePos.y * 0.8,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 left-[8%] w-12 h-12 md:w-20 md:h-20 opacity-[0.08]"
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "translateZ(40px)" }} />
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateY(180deg) translateZ(40px)" }} />
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateY(-90deg) translateZ(40px)" }} />
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateY(90deg) translateZ(40px)" }} />
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateX(90deg) translateZ(40px)" }} />
          <div className="absolute inset-0 border border-primary/50 bg-primary/5" style={{ transform: "rotateX(-90deg) translateZ(40px)" }} />
        </div>
      </motion.div>

      {/* 3D Tetrahedron (Pyramid) - Bottom Right */}
      <motion.div
        style={{
          x: mousePos.x * 1.2,
          y: mousePos.y * 0.3,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 360],
          rotateZ: [0, 180, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[15%] right-[15%] w-12 h-12 md:w-20 md:h-20 opacity-[0.06]"
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
          <div className="absolute w-full h-full bg-primary/10 border border-primary/30" style={{ transform: "rotateX(90deg) translateZ(-35px)" }} />
        </div>
      </motion.div>

      {/* Floating Data Streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 800, opacity: [0, 0.2, 0] }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent h-40"
          style={{ left: `${15 + i * 20}%`, top: 0 }}
        />
      ))}

      {/* 3D Wireframe Spheres (approximation with rings) */}
      <motion.div
        style={{
          x: -mousePos.x * 0.4,
          y: mousePos.y * 0.6,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[40%] w-32 h-32 opacity-[0.03]"
      >
        <div className="absolute inset-0 border border-primary rounded-full" />
        <div className="absolute inset-0 border border-primary rounded-full rotate-x-90" />
        <div className="absolute inset-0 border border-primary rounded-full rotate-y-90" />
      </motion.div>

      {/* Small Floating Bits */}
      {[
        { top: '15%', left: '10%', size: 'w-1 h-1' },
        { top: '45%', left: '80%', size: 'w-2 h-2' },
        { top: '85%', left: '30%', size: 'w-1 h-1' },
        { top: '10%', left: '70%', size: 'w-2 h-2' },
        { top: '60%', left: '15%', size: 'w-1 h-1' },
        { top: '30%', left: '90%', size: 'w-1 h-1' },
        { top: '75%', left: '65%', size: 'w-2 h-2' },
      ].map((pos, idx) => (
        <motion.div
          key={idx}
          style={{
            x: mousePos.x * (idx % 2 === 0 ? 1.5 : -1.5),
            y: mousePos.y * (idx % 3 === 0 ? 1 : -1),
            top: pos.top,
            left: pos.left,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + idx,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute ${pos.size} bg-primary rounded-full blur-[1px]`}
        />
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
