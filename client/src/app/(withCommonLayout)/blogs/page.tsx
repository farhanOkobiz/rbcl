import NavBar from "@/components/pages/header/NavBar/NavBar";
import BlogCard from "@/components/pages/landing_pages/BlogCard/BlogCard";
import { getUser } from "@/services/auth";
import { getAllBlogs } from "@/services/blogs";
import { getCartProducts } from "@/services/cart";
import React from "react";
import T1 from "../../../assets/texture/t8.jpg";
import NavBarThreeWrapper from "@/components/pages/header/NavBar/NavBarThreeWrapper";
import VideoBlogCard from "../VideoBlogCard/VideoBlogCard";
import FaceBookBlogCard from "../FaceBookBlogCard/FaceBookBlogCard";

// Define the Blog type
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

type PageProps = {
  searchParams: Promise<{
    category?: string;
    subCategory?: string;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  // Await searchParams first
  const params = await searchParams;

  const user = await getUser();
  const userRef = user?.id;
  const coupon = "";
  const userCartProducts = await getCartProducts(userRef, coupon);

  // Get filter params
  const categorySlug = params.category;
  const subCategorySlug = params.subCategory;
  console.log(
    "[blogs page] category:",
    categorySlug,
    "subCategory:",
    subCategorySlug
  );

  // Fetch blogs with filters
  const { data: allBlogs } = await getAllBlogs({
    categorySlug,
    subCategorySlug,
  });
  console.log(
    "[blogs page] fetched blogs count:",
    Array.isArray(allBlogs) ? allBlogs.length : "no-data"
  );

  const youtubeBlogs = allBlogs.filter(
    (blog: Blog) => (blog as any).youtubeUrl && (blog as any).youtubeUrl !== ""
  );

  const facebookBlogs = allBlogs.filter(
    (blog: any) =>
      blog.facebookUrl &&
      blog.facebookUrl !== "" &&
      blog.facebookUrl !== "undefined"
  );

  const normalBlogs = allBlogs.filter((blog: any) => {
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
    <div>
      <NavBar userCartProducts={userCartProducts?.data} />
      <NavBarThreeWrapper />
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

            {allBlogs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white text-xl font-semibold">
                  No blogs found for this filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
