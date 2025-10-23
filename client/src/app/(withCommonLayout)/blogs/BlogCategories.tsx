"use client";

import { TShopSideBar, TSubCategory } from "@/types";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogCategoriesProps {
  shopSideBar: TShopSideBar[];
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ shopSideBar }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );


  useEffect(() => {
    const cats = searchParams.get("category")?.split(",").map(c => c.trim().toLowerCase()) || [];
    const subCats = searchParams.get("subCategory")?.split(",").map(c => c.trim().toLowerCase()) || [];
    setSelectedCategories(cats);
    setSelectedSubCategories(subCats);
  }, [searchParams.toString()]);


  const updateParams = (type: "category" | "subCategory", value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentValues = new Set(
      (searchParams.get(type)?.split(",") || []).filter(Boolean)
    );

    if (currentValues.has(value)) {
      currentValues.delete(value);
    } else {
      currentValues.add(value);
    }

    if (currentValues.size > 0) {
      newParams.set(type, Array.from(currentValues).join(","));
    } else {
      newParams.delete(type);
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="px-4 pb-2 sticky top-0 h-screen overflow-y-scroll custom-scroll flex flex-col gap-4 pb-12">
      <div>
        <ul className="space-y-2 border border-[#52687f] rounded px-3 py-4 h-[500px] overflow-y-scroll">
          <h2 className="pb-2 text-base font-semibold uppercase">CATEGORY</h2>

          {shopSideBar?.map((cat) => (
            <li key={cat._id}>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() => updateParams("category", cat.slug)}
                  className="accent-[#495588]"
                />
                {cat.name}
              </label>

              <ul className="space-y-1 pl-6 mt-1">
                {Array.isArray(cat.subCategories) &&
                  cat.subCategories.map((subCat: TSubCategory) => (
                    <li key={subCat._id}>
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={selectedSubCategories.includes(subCat.slug)}
                          onChange={() =>
                            updateParams("subCategory", subCat.slug)
                          }
                          className="accent-[#495588]"
                        />
                        {subCat.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogCategories;
