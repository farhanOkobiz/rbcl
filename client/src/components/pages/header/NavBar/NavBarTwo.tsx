import { getAllCategorys } from "@/services/categorys";
import Link from "next/link";
import React from "react";

const NavBarTwo = async () => {
  const { data: categoriesList } = await getAllCategorys();
  console.log(categoriesList);

  return (
    <div className="bg-[#008080] text-white shadow-lg">
      <div className="Container px-6 py-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:justify-center lg:items-center lg:gap-8">
          {categoriesList?.length > 0 ? (
            categoriesList.map((cat: { _id: string; name: string }) => (
              <Link
                key={cat._id}
                href={`/category/${cat._id}`}
                className="relative md:font-bold md:text-lg uppercase tracking-wide transition-all duration-300 ease-in-out hover:text-teal-100 hover:scale-105 cursor-pointer group"
              >
                {cat.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            ))
          ) : (
            <p className="text-teal-100 text-sm italic">No categories found</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default NavBarTwo;