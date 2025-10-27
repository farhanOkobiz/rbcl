"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard/BlogCard";
import Link from "next/link";
import { motion } from "framer-motion";
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

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        if (Array.isArray(res?.data)) setBlogs(res.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className=" pb-12 max-w-[1280px] mx-auto">
      <div className=" flex md:items-center md:flex-row flex-col md:justify-between md:gap-0 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="lg:text-2xl text-xl font-semibold">
            Our Latest Blogs
          </h2>
          <p className="text-lg">
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
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <BlogCard
              title={blog.title}
              details={blog.details}
              image={blog.image}
              tags={blog.tags}
              date={blog.createdAt}
              author={blog.author}
              slug={blog.slug}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
