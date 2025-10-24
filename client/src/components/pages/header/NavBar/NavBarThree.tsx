"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Category = {
  _id: string;
  name: string;
  slug: string;
  subCategories?: { _id: string; name: string; slug: string }[];
};

const NavBarThree = ({
  categoriesWithSub,
}: {
  categoriesWithSub: Category[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/blogs?${params.toString()}`);
  };

  const selectedCategories = searchParams.get("category")?.split(",") || [];
  const selectedSubCategories =
    searchParams.get("subCategory")?.split(",") || [];

  return (
    <div className="bg-[#008080] text-white shadow-lg">
      <div className="Container px-6 py-3 border-t-2">
        <nav className="flex flex-wrap justify-center gap-8">
          {categoriesWithSub?.length > 0 ? (
            categoriesWithSub.map((cat) => (
              <div key={cat._id} className="relative">
                {/* Category Name */}
                <button
                  onClick={() => handleFilter("category", cat.slug)}
                  className={`peer relative md:font-bold md:text-lg uppercase tracking-wide transition-all duration-300 ease-in-out cursor-pointer inline-block py-2
                    ${
                      selectedCategories.includes(cat.slug)
                        ? "text-yellow-300"
                        : "hover:text-teal-100"
                    }
                      `}
                >
                  {cat.name}
                </button>

                {/* Subcategory Dropdown */}
                {cat.subCategories && cat.subCategories.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden peer-hover:block hover:block z-50">
                    <div className="w-56 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200">
                      <ul className="py-2">
                        {cat.subCategories.map((sub) => (
                          <li key={sub._id}>
                            <button
                              onClick={() =>
                                handleFilter("subCategory", sub.slug)
                              }
                              className={`w-full text-left block px-5 py-2.5 text-sm font-medium transition-colors duration-200
                              ${
                                selectedSubCategories.includes(sub.slug)
                                  ? "bg-[#008080] text-white"
                                  : "hover:bg-[#008080] hover:text-white"
                              }
                            `}
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-teal-100 text-sm italic">No categories found</p>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBarThree;
