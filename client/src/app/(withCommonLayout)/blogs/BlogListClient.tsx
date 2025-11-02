"use client";
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "@/services/blogs";
import T1 from "../../../assets/texture/t8.jpg";
import VideoBlogCard from "../VideoBlogCard/VideoBlogCard";
import FaceBookBlogCard from "../FaceBookBlogCard/FaceBookBlogCard";
import BlogCard from "@/components/pages/landing_pages/BlogCard/BlogCard";
import { Button } from "@/components/ui/button";

type Blog = {
  _id: string;
  title: string;
  details: string;
  image: string;
  facebookUrl: string;
  youtubeUrl: string;
  tags: string[];
  createdAt: string;
  author: string;
  slug: string;
};

function BlogListClient({
  categorySlug,
  subCategorySlug,
}: {
  categorySlug?: string;
  subCategorySlug?: string;
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await getAllBlogs({
        categorySlug,
        subCategorySlug,
        page: pageNum,
        limit: 9,
      });
      const data = res?.data?.blogs || [];
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setBlogs((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setHasMore(true);
    fetchBlogs(1);
  }, [categorySlug, subCategorySlug]);

  // youtube Blogs
  const youtubeBlogs = blogs.filter(
    (blog: Blog) => (blog as any).youtubeUrl && (blog as any).youtubeUrl !== ""
  );

  // facebook Blogs
  const facebookBlogs = blogs.filter(
    (blog: any) =>
      blog.facebookUrl &&
      blog.facebookUrl !== "" &&
      blog.facebookUrl !== "undefined"
  );

  // normal Blogs
  const normalBlogs = blogs.filter((blog: any) => {
    const hasYoutube =
      blog.youtubeUrl &&
      blog.youtubeUrl !== "" &&
      blog.youtubeUrl !== "undefined";
    const hasFacebook =
      blog.facebookUrl &&
      blog.facebookUrl !== "" &&
      blog.facebookUrl !== "undefined";

    return !hasYoutube && !hasFacebook;
  });

  return (
    <div className="">
      <div
        style={{
          backgroundImage: `url(${T1.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="Container py-12 lg:mt-0 mt-20"
      >
        <div className="  max-w-[1280px] mx-auto">
          {/* Youtube Blogs */}
          {youtubeBlogs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">
                YouTube Blogs
              </h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                {youtubeBlogs.map((blog: Blog) => (
                  <VideoBlogCard
                    key={blog._id}
                    title={blog.title}
                    youtubeUrl={blog.youtubeUrl}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Facebook Blogs */}
          {facebookBlogs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">
                Facebook Blogs
              </h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                {facebookBlogs.map((blog: Blog) => (
                  <FaceBookBlogCard
                    key={blog._id}
                    image={blog.image}
                    title={blog.title}
                    facebookUrl={blog.facebookUrl}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Normal Blogs */}
          {normalBlogs.length > 0 && (
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">Blogs</h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                {normalBlogs.map((blog: Blog) => (
                  <BlogCard
                    key={blog._id}
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
          )}

          {blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white text-xl font-semibold">
                No blogs found for this filter
              </p>
            </div>
          )}
          {/* Load More button  */}
          {hasMore && (
            <div className="text-center mt-10">
              <Button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchBlogs(nextPage);
                }}
                disabled={loading}
                className="bg-white text-black font-semibold hover:bg-gray-300 cursor-pointer px-6 py-4 rounded-md "
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogListClient;
