
const { default: mongoose } = require("mongoose");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");
const { BlogCategorySchema } = require("../../models/index.js");

class BlogCategoryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBlogCategory(payload, session) {
    const newBlogCategory = await this.#model.create([payload], { session });
    return newBlogCategory;
  }

  async getAllBlogCategory() {
    const blogCategories = await this.#model.find({}).sort({ createdAt: -1 });
    return blogCategories;
  }

  async getNavBar() {
    const navBar = await BlogCategorySchema.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "categoryRef",
          as: "subCategories",
        },
      },
      {
        $lookup: {
          from: "childcategories",
          localField: "subCategories._id",
          foreignField: "subCategoryRef",
          as: "childCategories",
        },
      },
      {
        $lookup: {
          from: "subchildcategories",
          localField: "childCategories._id",
          foreignField: "childCategoryRef",
          as: "subChildCategories",
        },
      },
      // {
      //   $addFields: {
      //     "subCategories.childCategories": {
      //       $filter: {
      //         input: "$childCategories",
      //         as: "child",
      //         cond: {
      //           $eq: ["$$child.subCategoryRef", "$$child.subCategoryRef"],
      //         },
      //       },
      //     },
      //   },
      // },
      {
        $addFields: {
          subCategories: {
            $map: {
              input: "$subCategories",
              as: "sub",
              in: {
                $mergeObjects: [
                  "$$sub",
                  {
                    childCategories: {
                      $filter: {
                        input: "$childCategories",
                        as: "child",
                        cond: {
                          $eq: ["$$child.subCategoryRef", "$$sub._id"],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      

      {
        $project: {
          childCategories: 0,
        },
      },
    ]);
    return navBar;
  }
  async getBlogCategoryById(blogCategoryId) {
    const blogCategory = await this.#model.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(blogCategoryId) }, // Match the specific category ID
      },
      {
        $lookup: {
          from: "subcategories", // Name of the subcategory collection in MongoDB
          localField: "_id", // Field in the Category collection to match
          foreignField: "categoryRef", // Field in the Subcategory collection to match
          as: "subCategories", // Alias for the joined subcategories
        },
      },
      {
        $limit: 1, // Ensure only one result is returned (optional but useful for clarity)
      },
    ]);

    // Return the first category if it exists, otherwise return null
    return blogCategory.length > 0 ? blogCategory[0] : null;
  }

  async getBlogCategoryBySlug(slug) {
    const blogCategory = await this.#model.aggregate([
      {
        $match: { slug: slug }, // Match the specific category ID
      },
      {
        $lookup: {
          from: "subcategories", // Name of the subcategory collection in MongoDB
          localField: "_id", // Field in the Category collection to match
          foreignField: "categoryRef", // Field in the Subcategory collection to match
          as: "subCategories", // Alias for the joined subcategories
        },
      },
      {
        $limit: 1, // Ensure only one result is returned (optional but useful for clarity)
      },
    ]);

    // Return the first category if it exists, otherwise return null
    return blogCategory.length > 0 ? blogCategory[0] : null;
  }

  async updateBlogCategory(id, payload) {
    const updatedBlogCategory = await this.#model.findByIdAndUpdate(id, payload);
    if (!updatedBlogCategory) {
      throw new Error("About Us not found");
    }
    return updatedBlogCategory;
  }

  async getBlogCategoryWithPagination(payload) {
    try {
      const blogCategorys = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const blogCategorys = await this.#model.aggregate([
            {
              $sort: { createdAt: sortOrder }, // Sort by createdAt in the desired order
            },
            {
              $skip: offset, // Skip records for pagination
            },
            {
              $limit: limit, // Limit records for pagination
            },
            {
              $lookup: {
                from: "subcategories", // Name of the subcategory collection in MongoDB
                localField: "_id", // Field in the Category collection to match
                foreignField: "categoryRef", // Field in the Subcategory collection to match
                as: "subCategories", // Alias for the joined subcategories
              },
            },
          ]);
          const totalBlogCategory = await this.#model.countDocuments();

          return { doc: blogCategorys, totalDoc: totalBlogCategory };
        }
      );

      return blogCategorys;
    } catch (error) {
      console.error("Error getting categorys with pagination:", error);
      throw error;
    }
  }
}

module.exports = new BlogCategoryRepository(BlogCategorySchema);
