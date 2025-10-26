import React from "react";
import { getAllFacebookBlogs } from "@/services/blogs";
import FaceBookBlogCard from "../FaceBookBlogCard/FaceBookBlogCard";
type Blog = {
  id: string;
  title: string;
  image: string;
  facebookUrl: string;
  youtubeUrl: string;
  createdAt: string;
  author: string;
  slug: string;
  tags?: string[];
};

const FaceBookBlogs = async () => {
  const allFacebookBlogs = await getAllFacebookBlogs();

  return (
    <div className="mt-6">
      <div className="flex md:items-center md:flex-row flex-col md:justify-between md:gap-0 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="lg:text-2xl text-xl font-semibold uppercase">
            Social Blogs
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {Array.isArray(allFacebookBlogs?.data) &&
          allFacebookBlogs.data
            .slice(0, 4)
            .map((blog: Blog) => (
              <FaceBookBlogCard
                key={blog.id}
                image={blog.image}
                title={blog.title}
                slug={blog.slug}
                facebookUrl={blog.facebookUrl}
              />
            ))}
      </div>
    </div>
  );
};

export default FaceBookBlogs;
