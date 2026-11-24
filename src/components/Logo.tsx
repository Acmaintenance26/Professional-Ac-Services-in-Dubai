import React from "react";
import { Snowflake, Wind, Shield, Sparkles } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = "dark", 
  size = "md",
  showTagline = true 
}) => {
  const isDarkBg = variant === "light"; // "light" text for dark backgrounds

  const iconSizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-2xl"
  }[size];

  const textSizeClasses = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl"
  }[size];

  return (
    <div className="flex items-center gap-2.5 group select-none">
      
      {/* Emblem Badge Container */}
      <div className={`relative ${iconSizeClasses} bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 ring-2 ring-sky-300/30`}>
        
        {/* Frost Glow Backdrop Effect */}
        <div className="absolute inset-0 bg-sky-400/20 rounded-inherit blur-xs group-hover:blur-sm transition-all" />

        {/* Dual Layered HVAC Icons */}
        <div className="relative z-10 flex items-center justify-center">
          <Snowflake className="w-5 h-5 text-sky-100 animate-spin-slow" />
          <Wind className="w-3.5 h-3.5 text-orange-300 absolute -bottom-0.5 -right-0.5 drop-shadow-xs" />
        </div>

        {/* Verified Badge Pin */}
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs" title="Official Licensed HVAC Provider" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1 font-black tracking-tight leading-none">
          <span className={`${textSizeClasses} ${isDarkBg ? "text-white" : "text-slate-900"}`}>
            AC Maintenance
          </span>
          <span className={`${textSizeClasses} text-orange-500 font-black`}>
            Dubai
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase text-sky-600 dark:text-sky-400 leading-none">
              Al Naveed HVAC Services
            </span>
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          </div>
        )}
      </div>

    </div>
  );
};
