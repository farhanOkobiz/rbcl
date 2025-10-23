"use server";

import {
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
} from "@/services/blogcategory";
import { TCategory } from "@/types/shared";
import { revalidatePath } from "next/cache";

export async function createFormAction(data: FormData) {
  try {
    const res = await createBlogCategory(data);

    revalidatePath("/");
    return true;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Duplicate error:", error.response.data.message);
      throw new Error(error.response.data.message); 
    } else {
      console.error("Something went wrong:", error.message);
      throw new Error(error.message);
    }
  }
}

export async function updateFormAction(id: string, data: any) {
  try {
    await updateBlogCategory(id, data);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteAction(id: string) {
  // const category = await getCategoryById(id);

  try {
    await deleteBlogCategory(id);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
