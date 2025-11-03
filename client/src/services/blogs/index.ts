"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllBlogs = async (filters?: {
  categorySlug?: string;
  subCategorySlug?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();

  if (filters?.categorySlug) params.append("category", filters.categorySlug);
  if (filters?.subCategorySlug)
    params.append("subCategory", filters.subCategorySlug);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  if (!apiBaseUrl)
    throw new Error(
      "API base URL is not configured (NEXT_PUBLIC_API_BASE_URL)"
    );

  const res = await fetch(`${apiBaseUrl}/blog?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch blogs: ${res.status} ${res.statusText} - ${text}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Expected JSON response but received ${contentType}: ${text}`
    );
  }

  return res.json();
};

export const getAllBlogForHome = async () => {
  const res = await fetch(`${apiBaseUrl}/blog/allBlogForHome`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch blogs for home: ${res.status} ${res.statusText} - ${text}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Expected JSON response but received ${contentType}: ${text}`
    );
  }

  return res.json();
};

export const getAllVideoBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/blog/videoBlogs`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch video blogs: ${res.status} ${res.statusText}`
    );
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON response but received ${contentType}`);
  }

  return res.json();
};

export const getAllFacebookBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/blog/facebookBlogs`);
  return res.json();
};

export const getAllLatestBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/blog/latestBlogs`);
  return res.json();
};

export const getSingleBlogBySlug = async (slug: string) => {
  console.log("slug", slug);
  console.log("slug", `${apiBaseUrl}/blog/single/${slug}`);
  const res = await fetch(`${apiBaseUrl}/blog/single/${slug}`);
  return res.json();
};
// export const getSingleBannerBySlug = async (slug: string) => {
//   const res = await fetch(`${apiBaseUrl}/banners/${slug}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch banners");
//   }

//   return res.json();
// };
