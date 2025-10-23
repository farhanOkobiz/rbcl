const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const blogCategoryRepository = require("./blogcategory.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BlogCategoryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async blogCreateCategory(payloadFiles, payload, session) {
    const { files } = payloadFiles;
    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogCategoryData = await this.#repository.createBlogCategory(
      payload,
      session
    );
    return blogCategoryData;
  }

  async getAllBlogCategory() {
    return await this.#repository.getAllBlogCategory();
  }

  async getBlogCategoryWithPagination(payload) {
    const blogCategory = await this.#repository.getBlogCategoryWithPagination(payload);
    return blogCategory;
  }

  async getSingleBlogCategory(id) {
    const blogCategoryData = await this.#repository.getBlogCategoryById(id);
    if (!blogCategoryData) throw new NotFoundError("Blog Category not found");
    return blogCategoryData;
  }

  async getSingleBlogCategoryWithSlug(slug) {
    const blogCategoryData = await this.#repository.getBlogCategoryBySlug(slug);
    if (!blogCategoryData) throw new NotFoundError("Blog Category not found");
    return blogCategoryData;
  }

  async getBlogNavBar() {
    const blogNavBarData = await this.#repository.getBlogNavBar();
    if (!blogNavBarData) throw new NotFoundError("Blog Navbar not found");
    return blogNavBarData;
  }

  async updateBlogCategory(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const { name, slug, subCategoryRef, status, colorCode } = payload;
    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogCategoryData = await this.#repository.updateBlogCategory(id, payload);

    if (files.length && blogCategoryData) {
      console.log("Replacing old upload:", blogCategoryData?.image);
      await removeUploadFile(blogCategoryData?.image);
    }

    return blogCategoryData;
  }

  async updateBlogCategoryStatus(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = status === "true";
    const blogCategory = await this.#repository.updateBlogCategoryStatus(id, {
      status: status,
    });
    if (!blogCategory) throw new NotFoundError("Blog Category not found");
    return blogCategory;
  }

  async deleteBlogCategory(id) {
    const blogCategory = await this.#repository.findById(id);
    if (!blogCategory) throw new NotFoundError("Blog Category not found");
    const deletedBlogCategory = await this.#repository.deleteById(id);
    if (deletedBlogCategory) {
      await removeUploadFile(blogCategory?.image);
    }
    return deletedBlogCategory;
  }
}

module.exports = new BlogCategoryService(blogCategoryRepository, "blogCategory");
