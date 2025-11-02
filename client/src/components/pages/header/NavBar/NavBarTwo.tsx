import { getAllBlogSubCategory } from "@/services/blogSubCategory";
import { getAllBlogCategorys } from "@/services/categorys";
import Link from "next/link";
import React from "react";

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
};

const NavBarTwo = async () => {
  const { data: blogCategoriesList } = await getAllBlogCategorys();
  const { data: blogSubCategoriesList } = await getAllBlogSubCategory();

  const categoriesWithSub = blogCategoriesList?.map((cat: any) => {
    const subCategories = blogSubCategoriesList?.filter((sub: any) => {
      const categoryId =
        typeof sub.categoryRef === "object"
          ? sub.categoryRef?._id
          : sub.categoryRef;

      return categoryId === cat._id;
    });
    return { ...cat, subCategories };
  });

  return (
    <div className="bg-[#008080] text-white shadow-lg">
      <div className="Container px-6 py-5">
        <nav className="flex flex-wrap justify-center gap-8">
          {categoriesWithSub?.length > 0 ? (
            categoriesWithSub.map(
              (cat: {
                _id: string;
                name: string;
                slug: string;
                subCategories?: { _id: string; name: string }[];
              }) => (
                <div key={cat._id} className="relative">
                  {/* Category Name */}
                  <Link
                    href={`/blogs?category=${cat?.slug}`}
                    className="peer relative md:font-bold md:text-lg uppercase tracking-wide transition-all duration-300 ease-in-out hover:text-teal-100 cursor-pointer inline-block py-2"
                  >
                    {cat.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out hover:w-full"></span>
                  </Link>

                  {/* Subcategory Dropdown */}
                  {cat.subCategories && cat.subCategories.length > 0 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden peer-hover:block hover:block z-50">
                      <div className="w-56 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200">
                        <ul className="py-2">
                          {(cat.subCategories as SubCategory[]).map((sub) => (
                            <li key={sub._id}>
                              <Link
                                href={`/blogs?subCategory=${sub.slug}`}
                                className="block px-5 py-2.5 text-sm font-medium hover:bg-[#008080] hover:text-white transition-colors duration-200"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <p className="text-teal-100 text-sm italic">No categories found</p>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBarTwo;
