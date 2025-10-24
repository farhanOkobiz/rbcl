import { apiBaseUrl } from "@/config/config";

export async function getAllBlogSubCategory() {
  const response = await fetch(`${apiBaseUrl}/blog-subcategory`);
  console.log(response, "ok");

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
