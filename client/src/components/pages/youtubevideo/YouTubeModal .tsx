"use client";
import React from "react";

type Props = {
  url: string;
  title: string;
  onClose: () => void;
};

export const YouTubeModal: React.FC<Props> = ({ url, title, onClose }) => {
  if (!url) return <span className="text-gray-400">No video</span>;

  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 mx-4 md:px-6"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-xl shadow-xl max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-3 text-[#52687f] hover:text-red-700 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition"
        >
          ✕
        </button>
        {videoId ? (
          <div className="aspect-video w-full h-full">
            <iframe
              width="100%"
              height="100%"
              src={`${embedUrl}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No video found</p>
        )}
      </div>
    </div>
  );
};
