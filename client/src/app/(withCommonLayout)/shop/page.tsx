import ShopProducts from "@/components/pages/products/ShopProducts/ShopProducts";
import ShopProductsCategories from "@/components/pages/products/ShopProductsCategories/ShopProductsCategories";
import { getShopSidebar } from "@/services/shopSidebar";
import { getAllProductsForShop } from "@/services/products";
import { getUser } from "@/services/auth";
import { getCartProducts } from "@/services/cart";
import CartSideBar from "@/components/pages/cartSideBar/CartSideBar";
import React from "react";
import { Metadata } from "next";
import NavBar from "@/components/pages/header/NavBar/NavBar";
import T2 from "../../../assets/texture/t8.jpg";

export const metadata: Metadata = {
  title: "RBCL | All Product",
  description: "Best E-commerce platform in BD",
};

export const revalidate = 0;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { data: shopSideBar } = await getShopSidebar();

  const categorySlug = Array.isArray(params.category)
    ? params.category[0]
    : params.category || "";

  const subCategorySlug = Array.isArray(params.subCategory)
    ? params.subCategory[0]
    : params.subCategory || "";

  const childCategorySlug = Array.isArray(params.childCategory)
    ? params.childCategory[0]
    : params.childCategory || "";

  const brand = Array.isArray(params.brand)
    ? params.brand[0]
    : params.brand || "";

  const gender = Array.isArray(params.gender)
    ? params.gender[0]
    : params.gender || "";

  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const { data: products } = await getAllProductsForShop({
    categorySlug,
    subCategorySlug,
    childCategorySlug,
    brand,
    gender,
    minPrice,
    maxPrice,
  });

  const user = await getUser();
  const userId = user?.id;
  const coupon = "";
  const cartProducts = await getCartProducts(userId, coupon);

  return (
    <>
      <NavBar userCartProducts={cartProducts?.data} />
      <div
        style={{
          backgroundImage: `url(${T2.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen text-white pt-[100px] md:pt-[130px] lg:pt-0 px-0"
      >
        <div className="">
          <div className="max-w-[1310px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {/* Sidebar - Categories */}
            <div className="col-span-1">
              <ShopProductsCategories
                shopSideBar={shopSideBar}
                products={products.filterOptions}
              />
            </div>
            
            {/* Main Products Area */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <ShopProducts
                products={products.result}
                pagination={products.pagination}
                categorySlug={categorySlug}
                subCategorySlug={subCategorySlug}
                childCategorySlug={childCategorySlug}
                brand={brand}
                gender={gender}
              />
            </div>
          </div>
        </div>
        
        <CartSideBar cartProducts={cartProducts?.data} />
      </div>
    </>
  );
}