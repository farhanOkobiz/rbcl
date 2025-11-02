import React from "react";
import FaceBookBlogs from "@/app/(withCommonLayout)/Facebookblog/FaceBookBlogs";
import VideoBlogs from "@/app/(withCommonLayout)/VideoBlogs/VideoBlogs";
import BlogCardForHome from "../BlogCardForHome/BlogCardForHome";
import { getAllBlogForHome } from "@/services/blogs";

type Blog = {
  id: string;
  title: string;
  details: string;
  image: string;
  tags: string[];
  createdAt: string;
  author: string;
  slug: string;
};

const BlogsForHome = async () => {
  const allBlogs = await getAllBlogForHome();
  return (
    <div>
      <div className="Container pb-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-2 gap-4">
            <div className="lg:col-span-8 md:col-span-12">
              <div className="flex md:items-center md:flex-row flex-col md:justify-between md:gap-0 gap-2 mt-6 mb-4">
                <div className="flex flex-col gap-2">
                  <h2 className="lg:text-2xl text-xl font-semibold uppercase">
                    Featured Blogs
                  </h2>
                </div>
              </div>
              {Array.isArray(allBlogs?.data) &&
                allBlogs.data
                  .slice(0, 4)
                  .map((blog: Blog) => (
                    <BlogCardForHome
                      key={blog.id}
                      title={blog.title}
                      details={blog.details}
                      image={blog.image}
                      tags={blog.tags}
                      date={blog.createdAt}
                      author={blog.author}
                      slug={blog.slug}
                    />
                  ))}
            </div>
            <div className="lg:col-span-4 md:col-span-12 md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-1 ">
              <FaceBookBlogs />
              <div className="md:mt-10 lg:mt-0">
              <VideoBlogs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsForHome;
