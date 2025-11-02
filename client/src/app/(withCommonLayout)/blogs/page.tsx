import NavBar from "@/components/pages/header/NavBar/NavBar";
import { getUser } from "@/services/auth";
import { getCartProducts } from "@/services/cart";
import React from "react";
import NavBarThreeWrapper from "@/components/pages/header/NavBar/NavBarThreeWrapper";
import BlogListClient from "./BlogListClient";

// Define the Blog type


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

 

  return (
    <div>
      <NavBar userCartProducts={userCartProducts?.data} />
      <NavBarThreeWrapper />
      <BlogListClient
        categorySlug={categorySlug}
        subCategorySlug={subCategorySlug}
      />
    </div>
  );
};

export default page;
