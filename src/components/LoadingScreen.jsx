import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    // Simulate loading time, or allow the parent to control
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds loading animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      y: "-100%", 
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } 
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      transition: { duration: 0.5, ease: "easeIn" } 
    }
  };

  const loaderVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%", 
      transition: { duration: 2, ease: "easeInOut" } 
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0a]"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Animated Rings */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        <motion.div
          className="absolute inset-0 border-t-4 border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-r-4 border-purple-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 border-b-4 border-emerald-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Core solid circle */}
        <motion.div 
          className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Loading Text */}
      <motion.div 
        variants={textVariants}
        className="text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400"
      >
        InterviewIQ
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-gray-400 text-sm tracking-widest uppercase font-semibold"
      >
        Initializing AI Environment
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-64 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400"
          variants={loaderVariants}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
