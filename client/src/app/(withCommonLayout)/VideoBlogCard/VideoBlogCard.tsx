"use client";
import React, { useState } from "react";
import { YouTubeModal } from "../../youtubevideo/YouTubeModal ";
import { motion } from "framer-motion";

export type VideoBlogCardProps = {
  title: string;
  youtubeUrl?: string;
};

const VideoBlogCard: React.FC<VideoBlogCardProps> = ({ title, youtubeUrl }) => {
  const [open, setOpen] = useState(false);

  const getVideoId = (url?: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = getVideoId(youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group cursor-pointer h-96"
        onClick={() => videoId && setOpen(true)}
      >
        <div className="p-2 border border-[#CCD5AE] rounded overflow-hidden h-[350px] lg:h-[260px] xl:h-[350px] relative">
          {videoId ? (
            <>
              <iframe
                src={`${embedUrl}?controls=0`}
                title={title}
                className="w-full h-full rounded pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-lg font-semibold">
                  ▶ Watch
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm">
              No video available
            </div>
          )}
        </div>

        <div className="px-2 py-2">
          <h2 className="lg:text-lg text-base font-semibold line-clamp-1 text-[#52687f]">
            {title}
          </h2>
        </div>
      </motion.div>

      {open && (
        <YouTubeModal
          url={youtubeUrl || ""}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default VideoBlogCard;
