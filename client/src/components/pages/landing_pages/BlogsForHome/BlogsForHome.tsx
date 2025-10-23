import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import Link from "next/link";
import { getAllBlogs } from "@/services/blogs";
import BlogCardForHome from "../BlogCardForHome/BlogCardForHome";
import Blogs from "../Blogs/Blogs";
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
  const allBlogs = await getAllBlogs();
  return (
    <div className="Container pb-12">
      <div className="max-w-[1280px] mx-auto">
        {/* <div className="flex  md:items-center md:flex-row flex-col md:justify-between md:gap-0 gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="lg:text-2xl text-xl font-semibold">
              Our Latest Blogs
            </h2>
            <p className="text-[#262626]/60 text-lg">
              Read blogs to know more about perfume-fragrance
            </p>
          </div>
          <Link href="/blogs">
            <div className="md:px-6 md:py-3 p-2 md:text-base text-sm text-[#fff] rounded bg-[#008080] inline-flex hover:bg-[#CCD5AE] duration-300 cursor-pointer">
              <button className="cursor-pointer">View More</button>
            </div>
          </Link>
        </div> */}
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div className="col-span-2">
            {
              Array.isArray(allBlogs?.data) &&
              allBlogs.data.slice(0, 4).map((blog: Blog) => (
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
              ))
            }
          </div>
           <div className="col-span-1">
             <Blogs/>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsForHome;
