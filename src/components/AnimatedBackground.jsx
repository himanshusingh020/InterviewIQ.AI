import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BsRobot, 
  BsMic, 
  BsClock, 
  BsCodeSlash, 
  BsGraphUp, 
  BsBriefcase, 
  BsStars,
  BsTerminal
} from 'react-icons/bs';

const terms = ["Interview", "Practice", "Logic", "AI", "Confidence", "Success", "Growth"];
const icons = [BsRobot, BsMic, BsClock, BsCodeSlash, BsGraphUp, BsBriefcase, BsStars, BsTerminal];

// Helper to generate a random number
const random = (min, max) => Math.random() * (max - min) + min;

const FloatingElement = ({ item, isIcon }) => {
  const [styles, setStyles] = useState({});
  const [animation, setAnimation] = useState({});

  useEffect(() => {
    // Generate random starting and ending values only on client side to avoid hydration mismatch
    const size = isIcon ? random(20, 40) : random(14, 24);
    const startX = random(0, 100);
    const endX = startX + random(-20, 20);
    const duration = random(15, 30);
    const delay = random(0, 10);
    const rotate = random(-45, 45);

    setStyles({
      left: `${startX}%`,
      bottom: '-10%',
      fontSize: size,
    });

    setAnimation({
      y: [0, -1200], // Float up
      x: [0, endX - startX], // Drift sideways slightly
      rotate: [0, rotate],
      opacity: [0, 0.5, 0], // Fade in and out
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: delay,
      }
    });
  }, [isIcon]);

  if (!styles.left) return null; // Wait for client-side math

  const IconComponent = isIcon ? item : null;

  return (
    <motion.div
      className="absolute text-blue-500/30 font-semibold whitespace-nowrap pointer-events-none select-none"
      style={styles}
      animate={{
        y: animation.y,
        x: animation.x,
        rotate: animation.rotate,
        opacity: animation.opacity,
      }}
      transition={animation.transition}
    >
      {isIcon ? <IconComponent /> : item}
    </motion.div>
  );
};

const AnimatedBackground = () => {
  // Combine multiple instances of terms and icons for a dense background
  const elements = [
    ...terms, ...terms, ...terms,
    ...icons, ...icons, ...icons,
    ...terms, ...icons
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Floating Elements */}
      {elements.map((item, index) => (
        <FloatingElement 
          key={index} 
          item={item} 
          isIcon={typeof item === 'function'} 
        />
      ))}

      {/* Futuristic grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glow Orbs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: 1.2, opacity: 0.6 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-blue-300 rounded-full blur-[100px] opacity-30"
      />
      <motion.div
        initial={{ scale: 1, opacity: 0.2 }}
        animate={{ scale: 1.5, opacity: 0.5 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        className="absolute top-[50%] right-[15%] w-[400px] h-[400px] bg-indigo-300 rounded-full blur-[120px] opacity-20"
      />
    </div>
  );
};

export default AnimatedBackground;
