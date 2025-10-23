"use server";

import { BASE_URL } from "@/config/config";
import {
  AllSubCategoryResponse,
  AllSubCategoryWithPaginationResponse,
  SingleSubCategoryResponse,
  TSubCategory,
} from "@/types/shared";

export async function createBlogSubCategory(data: any) {
  const response = await fetch(`${BASE_URL}/blog-subcategory`, {
    // headers: {
    //   "Content-Type": "application/json",
    // },
    method: "POST",
    body: data,
    // body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getAllBlogSubCategory(): Promise<AllSubCategoryResponse> {
  const response = await fetch(`${BASE_URL}/blog-subcategory`);
  console.log(response, "ok");
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getBlogSubCategoryWithPagination(
  page?: string,
  limit?: string
): Promise<AllSubCategoryWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/blog-subcategory/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getBlogSubCategoryById(id: string): Promise<SingleSubCategoryResponse> {
  const response = await fetch(`${BASE_URL}/blog-subcategory/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function updateBlogSubCategory(id: string, data: any) {
  const response = await fetch(`${BASE_URL}/blog-subcategory/${id}`, {
    method: "PUT",
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function deleteBlogSubCategory(id: string) {
  const response = await fetch(`${BASE_URL}/blog-subcategory/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
