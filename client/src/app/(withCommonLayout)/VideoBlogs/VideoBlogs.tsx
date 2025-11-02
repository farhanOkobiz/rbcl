import React from "react";
import Link from "next/link";
import VideoBlogCard from "../VideoBlogCard/VideoBlogCard";
import { getAllVideoBlogs } from "@/services/blogs";
type Blog = {
  id: string;
  title: string;
  youtubeUrl: string;
  tags: string[];
  createdAt: string;
  author: string;
  slug: string;
};

const VideoBlogs = async () => {
  try {
    const allVideoBlogs = await getAllVideoBlogs();

    if (!allVideoBlogs || !allVideoBlogs.data) {
      throw new Error("No video blogs data received");
    }

    return (
      <div className=" md:mt-7 lg:mt-4">
        <div className="grid grid-cols-1">
          {Array.isArray(allVideoBlogs?.data) &&
            allVideoBlogs.data
              .slice(0, 4)
              .map((blog: Blog) => (
                <VideoBlogCard
                  key={blog.id}
                  title={blog.title}
                  youtubeUrl={blog.youtubeUrl}
                />
              ))}
        </div>
        <Link href="/blogs">
          <div className="md:px-6 md:py-3 p-2 md:text-base text-sm text-[#fff] rounded bg-[#52687f] inline-flex hover:bg-[#CCD5AE] hover:text-gray-900 duration-300 cursor-pointer">
            <button className="cursor-pointer">View More</button>
          </div>
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error loading video blogs:", error);
    return (
      <div className="mt-6 p-4 text-center">
        <h2 className="text-xl text-red-600">Failed to load video blogs</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }
};

export default VideoBlogs;
