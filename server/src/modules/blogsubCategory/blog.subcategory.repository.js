
const { BlogSubCategorySchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class BlogSubCategoryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  // Create a new Blog SubCategory
  async createBlogSubCategory(payload, session) {
    const { viewType } = payload;

    // Ensure viewType is valid and reset previous
    if (viewType) {
      const validViewTypes = ["top", "middle", "lowerMiddle", "bottom"];
      if (!validViewTypes.includes(viewType)) {
        throw new Error("Invalid viewType provided");
      }
      await this.#model.findOneAndUpdate(
        { viewType: viewType },
        { viewType: "" },
        { new: true, session }
      );
    }

    // Create new subcategory
    const blogSubCategories = await this.#model.create([payload], { session });
    return blogSubCategories;
  }

  // Update Blog SubCategory
  async updateBlogSubCategory(id, payload, session) {
    const { viewType } = payload;

    if (viewType) {
      const validViewTypes = ["top", "middle", "lowerMiddle", "bottom"];
      if (!validViewTypes.includes(viewType)) {
        throw new Error("Invalid viewType provided");
      }

      await this.#model.findOneAndUpdate(
        { viewType: viewType },
        { viewType: "" },
        { new: true, session }
      );
    }

    const updatedBlogSubCategory = await this.#model.findByIdAndUpdate(
      id,
      payload,
      { new: true, session }
    );

    if (!updatedBlogSubCategory) {
      throw new Error("Blog SubCategory not found");
    }

    return updatedBlogSubCategory;
  }

  // Get Blog SubCategories with Pagination
  async getBlogSubCategoryWithPagination(payload) {
    try {
      const blogSubCategories = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const blogSubCategories = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit)
            .populate("categoryRef");

          const totalBlogSubCategories = await this.#model.countDocuments();
          return { doc: blogSubCategories, totalDoc: totalBlogSubCategories };
        }
      );

      return blogSubCategories;
    } catch (error) {
      console.error("Error getting BlogSubCategories with pagination:", error);
      throw error;
    }
  }
}

module.exports = new BlogSubCategoryRepository(BlogSubCategorySchema);
