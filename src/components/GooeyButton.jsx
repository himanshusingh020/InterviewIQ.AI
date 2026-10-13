import React from 'react';

const GooeyButton = ({ children, onClick, variant = "dark", className = '' }) => {
  const isDark = variant === "dark";

  const mainBg = isDark ? "bg-black/95" : "bg-white";
  const blobColor = isDark ? "bg-gray-800" : "bg-gray-200";
  const textColor = isDark ? "text-white" : "text-black";
  const border = isDark ? "border-transparent shadow-xl" : "border border-gray-200 shadow-sm";

  return (
    <>
      <svg className="w-0 h-0 absolute hidden pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <button
        onClick={onClick}
        className={`group relative isolate flex items-center justify-center px-8 py-4 font-semibold transition-transform hover:-translate-y-1 ${textColor} ${border} ${className} rounded-2xl`}
      >
        {/* The Gooey Background Container */}
        <div
          className="absolute inset-0 -z-10 rounded-2xl overflow-hidden pointer-events-none"
          style={{ filter: "url(#goo)" }}
        >
          {/* Base Background Layer */}
          <div className={`absolute inset-0 ${mainBg} rounded-2xl`} />

          {/* Liquid Blobs that melt upward on hover */}
          <div className="absolute top-full left-0 w-[120%] h-full flex justify-around -translate-x-[10%] group-hover:-translate-y-[80%] transition-transform duration-[600ms] ease-out">
            <div className={`w-8 h-10 ${blobColor} rounded-[40%] animate-pulse`}></div>
            <div className={`w-12 h-16 ${blobColor} rounded-full transition-all duration-[700ms] delay-75 group-hover:-translate-y-4`}></div>
            <div className={`w-10 h-12 ${blobColor} rounded-full transition-all duration-500 delay-150 group-hover:-translate-y-2`}></div>
            <div className={`w-14 h-14 ${blobColor} rounded-full transition-all duration-[800ms] delay-100 group-hover:-translate-y-6`}></div>
          </div>
        </div>

        {/* Inner Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    </>
  );
};

export default GooeyButton;
