import React from "react";
import { getAllFacebookBlogs } from "@/services/blogs";
import FaceBookBlogCard from "../FaceBookBlogCard/FaceBookBlogCard";

type Blog = {
  id: string;
  title: string;
  facebookUrl: string;
  youtubeUrl: string;
  image: string;
  tags: string[];
  createdAt: string;
  author: string;
  slug: string;
};

const FaceBookBlogs = async () => {
  const allFacebookBlogs = await getAllFacebookBlogs();

  return (
    <div className="mt-6">
      <div className="flex md:items-center md:flex-row flex-col md:justify-between md:gap-0 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="lg:text-2xl text-xl font-semibold uppercase text-white">
            Social Blogs
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-4 w-full">
        {Array.isArray(allFacebookBlogs?.data) &&
          allFacebookBlogs.data
            .slice(0, 4)
            .map((blog: Blog) => (
              <div key={blog.id} className="w-full">
                <FaceBookBlogCard
                  image={blog.image ?? ""}
                  title={blog.title}
                  facebookUrl={blog.facebookUrl}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default FaceBookBlogs;