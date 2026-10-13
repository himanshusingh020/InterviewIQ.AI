import React from 'react';
import { motion } from 'framer-motion';

const AnimatedAIPoweredText = () => {
  const text = "AI-Powered";
  
  // Custom random positions and intense transformations for cinematic entry
  const startPositions = [
    { x: -400, y: -300, rotate: -90, scale: 4 }, // A
    { x: 300, y: -450, rotate: 45, scale: 5 },   // I
    { x: 0, y: -500, rotate: 180, scale: 3 },    // -
    { x: 500, y: -100, rotate: -45, scale: 6 },  // P
    { x: -350, y: 400, rotate: 120, scale: 4 },  // o
    { x: 600, y: 300, rotate: -135, scale: 5 },  // w
    { x: -500, y: 0, rotate: 90, scale: 6 },     // e
    { x: 0, y: 500, rotate: -180, scale: 4 },    // r
    { x: 350, y: 450, rotate: 60, scale: 4.5 },  // e
    { x: -450, y: 200, rotate: -60, scale: 5 },  // d
  ];

  const letterVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: startPositions[i].x,
      y: startPositions[i].y,
      rotate: startPositions[i].rotate,
      scale: startPositions[i].scale,
      filter: "blur(20px)",
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
        delay: i * 0.1 + 0.5, // staggered entry
      }
    }),
  };

  return (
    <span className="relative inline-block mt-2 font-extrabold z-20">
      <span 
        className="relative z-10 inline-flex"
        style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))" }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"
            style={{ paddingRight: char === '-' ? '0.1em' : '0' }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Shine overlay that triggers after letters gather */}
      <motion.span
        className="absolute inset-0 z-30 pointer-events-none bg-clip-text text-transparent bg-gradient-to-r from-transparent via-white to-transparent bg-[length:200%_auto] mix-blend-overlay"
        initial={{ opacity: 0, backgroundPosition: "-200% center" }}
        animate={{ opacity: 0.9, backgroundPosition: "200% center" }}
        transition={{
          opacity: { delay: 3, duration: 1 },
          backgroundPosition: {
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
            delay: 3 // starts after gather
          }
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 2.8, duration: 1, ease: "easeOut" }}
        className="absolute -bottom-2 left-0 h-[6px] bg-blue-500/20 rounded-full"
      />
    </span>
  );
};

export default AnimatedAIPoweredText;
