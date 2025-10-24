import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import Link from "next/link";
import { getAllBlogs } from "@/services/blogs";
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

const Blogs = async () => {
  const allBlogs = await getAllBlogs();
  return (
    <div className="Container pb-12">
      <div className="flex md:items-center md:flex-row flex-col md:justify-between md:gap-0 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="lg:text-2xl text-xl font-semibold">
            Our Latest Blogs
          </h2>
          <p className=" text-lg">
            Read blogs to know more about perfume-fragrance
          </p>
        </div>
        <Link href="/blogs">
          <div className="md:px-6 md:py-3 p-2 md:text-base text-sm text-[#fff] rounded bg-[#52687f] inline-flex hover:bg-[#CCD5AE] duration-300 cursor-pointer">
            <button className="cursor-pointer">View More</button>
          </div>
        </Link>
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {Array.isArray(allBlogs?.data) &&
          allBlogs.data
            .slice(0, 4)
            .map((blog: Blog) => (
              <BlogCard
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
    </div>
  );
};

export default Blogs;
