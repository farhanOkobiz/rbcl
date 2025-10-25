"use client";

import React from "react";
import { motion } from "framer-motion";
import { menuList } from "@/utilits/menuList";
import Link from "next/link";

type ResponsiveNavSidBarProps = {
  onClose: () => void;
};

const ResponsiveNavSidBar: React.FC<ResponsiveNavSidBarProps> = ({ onClose }) => {
  return (
    <div>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        className="w-[70%] bg-white top-[80px] h-screen fixed left-0 z-30 pt-6 lg:hidden px-4"
      >
        <ul className="flex flex-col gap-4">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link href={menu.link} onClick={onClose} className="text-lg font-medium hover:text-[#008080]">
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ResponsiveNavSidBar;
