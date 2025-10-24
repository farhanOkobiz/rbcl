import { getAllBlogSubCategory } from "@/services/blogSubCategory";
import { getAllBlogCategorys } from "@/services/categorys";
import NavBarThree from "./NavBarThree";

const NavBarThreeWrapper = async () => {
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


  return <NavBarThree categoriesWithSub={categoriesWithSub || []} />;
};

export default NavBarThreeWrapper;
