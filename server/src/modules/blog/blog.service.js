const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const blogRepository = require("./blog.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BlogService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBlog(payload, payloadFiles, session) {
    const { files } = payloadFiles;

    if (files && files.length > 0) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogData = await this.#repository.createBlog(payload);
    return blogData;
  }

  async getAllBlog(payload) {
    const { tagRef, category, subCategory } = payload;

    const filter = {
      status: true,
      $or: [
        { youtubeUrl: { $exists: false } },
        { youtubeUrl: null },
        { youtubeUrl: "" },
      ],
    };

    if (tagRef) filter.tagRef = tagRef;
    if (category) filter["blogCategoryRef"] = category;
    if (subCategory) filter["blogSubCategoryRef"] = subCategory;

    return await this.#repository.findAll(filter);
  }

  async getAllVideoBlog(payload) {
    const { tagRef } = payload;

    const filter = {
      status: true,
      youtubeUrl: { $exists: true, $ne: "" },
    };

    if (tagRef) filter.tagRef = tagRef;

    return await this.#repository.findAll(filter);
  }

  async getBlogWithPagination(payload) {
    const blog = await this.#repository.getBlogWithPagination(payload);
    return blog;
  }

  async getSingleBlog(slug) {
    const blogData = await this.#repository.getSingleBlog(slug);
    if (!blogData) throw new NotFoundError("Blog Not Find");
    return blogData;
  }

  async updateBlog(id, payload, payloadFiles, session) {
    const { files } = payloadFiles;
    const { title, details, tagRef, author, status } = payload;

    if (files && files.length > 0) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogData = await this.#repository.updateById(id, payload);
    console.log("blogData", blogData);
    if (!blogData) throw new NotFoundError("Blog Not Find");

    if (files?.length && blogData?.images) {
      await removeUploadFile(blogData?.images);
    }
    return blogData;
  }

  async deleteBlog(id) {
    const blog = await this.#repository.findById(id);
    if (!blog) throw new NotFoundError("Blog not found");
    const deletedBlog = await this.#repository.deleteById(id);
    if (deletedBlog) {
      await removeUploadFile(blog?.image);
    }
    return deletedBlog;
  }
}

module.exports = new BlogService(blogRepository, "blog");
