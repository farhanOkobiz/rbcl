const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const blogSubCategoryRepository = require("./blog.subcategory.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BlogSubCategoryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBlogSubCategory(payloadFiles, payload, session) {
    const { files } = payloadFiles;
    const { name, status, slug } = payload;
    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogSubCategoryData = await this.#repository.createBlogSubCategory(
      payload,
      session
    );
    return blogSubCategoryData;
  }

  async getAllBlogSubCategory() {
    return await this.#repository.findAll({}, ["categoryRef"]);
  }

  async getBlogSubCategoryWithPagination(payload) {
    const blogSubCategory = await this.#repository.getBlogSubCategoryWithPagination(
      payload
    );
    return blogSubCategory;
  }

  async getSingleBlogSubCategory(id) {
    const blogSubCategoryData = await this.#repository.findById(id, [
      "blogCategoryRef",
    ]);
    if (!blogSubCategoryData) throw new NotFoundError("Blog SubCategory Not Found");
    return blogSubCategoryData;
  }

  async getSingleBlogSubCategoryWithSlug(slug) {
    const blogSubCategoryData = await this.#repository.findOne({ slug: slug }, [
      "blogCategoryRef",
    ]);
    if (!blogSubCategoryData) throw new NotFoundError("Blog SubCategory Not Found");
    return blogSubCategoryData;
  }

  async updateBlogSubCategory(id, payloadFiles, payload, session) {
    const { files } = payloadFiles;
    const { name, status, slug } = payload;
    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogSubCategoryData = await this.#repository.updateBlogSubCategory(
      id,
      payload,
      session
    );

    if (files.length && blogSubCategoryData) {
      await removeUploadFile(blogSubCategoryData?.image);
    }

    return blogSubCategoryData;
  }

  async updateBlogSubCategoryStatus(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = status === "true";
    const blogSubCategory = await this.#repository.updateBlogSubCategoryStatus(id, {
      status: status,
    });
    if (!blogSubCategory) throw new NotFoundError("Blog SubCategory not found");
    return blogSubCategory;
  }

  async deleteBlogSubCategory(id) {
    const blogSubCategory = await this.#repository.findById(id);
    if (!blogSubCategory) throw new NotFoundError("Blog SubCategory not found");
    const deletedBlogSubCategory = await this.#repository.deleteById(id);
    if (deletedBlogSubCategory && blogSubCategory?.image) {
      await removeUploadFile(blogSubCategory?.image);
    }
    return deletedBlogSubCategory;
  }
}

module.exports = new BlogSubCategoryService(blogSubCategoryRepository, "blogSubCategory");
