import React from 'react';
import { Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  return (
    <div className="relative group">
      <motion.button
        disabled
        className="relative p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 
                   border border-gray-700 opacity-50 cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        aria-label="Theme toggle disabled"
      >
        <Moon size={20} className="text-slate-400" />
      </motion.button>
      
      {/* Tooltip */}
      <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-xs 
                      rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 
                      group-hover:visible transition-all duration-200 pointer-events-none z-50
                      border border-gray-700">
        Light theme in progress
        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 border-t border-l 
                        border-gray-700 rotate-45"></div>
      </div>
    </div>
  );
}