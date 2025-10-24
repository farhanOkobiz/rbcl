"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsArrowRight, BsFacebook } from "react-icons/bs";
import { apiBaseUrl } from "@/config/config";

export type FaceBookBlogCardProps = {
  title: string;
  image: string;
  slug: string;
  facebookUrl?: string;
};

const FaceBookBlogCard: React.FC<FaceBookBlogCardProps> = ({
  title,
  image,
  facebookUrl,
}) => {
  return (
    <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group cursor-pointer border border-[#CCD5AE] rounded overflow-hidden"
      >
        {/* Image */}
        <div className="relative w-full h-56 md:h-36 lg:h-64 xl:h-72 overflow-hidden">
          <Image
            src={apiBaseUrl + image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 duration-500"
          />
          {/* Facebook icon badge */}
          {facebookUrl && (
            <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-blue-100 transition">
              <BsFacebook className="text-blue-600 w-5 h-5" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-3 py-3">
          <h2 className="lg:text-lg text-base font-semibold line-clamp-1 ">
            {title}
          </h2>

          {/* Read More */}
          <div className="flex items-center gap-1 mt-2 font-semibold ">
            <span>Read More</span>
            <span className="mt-1">
              <BsArrowRight />
            </span>
          </div>
        </div>
      </motion.div>
    </a>
  );
};

export default FaceBookBlogCard;
