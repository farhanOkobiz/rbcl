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
    const { tagRef, blogCategoryRef, blogSubCategoryRef } = payload;
    console.log(blogCategoryRef, blogSubCategoryRef, "ok");
    const filter = {}; // filter object

    if (tagRef) filter.tagRef = tagRef;
    if (blogCategoryRef) filter.blogCategoryRef = blogCategoryRef;
    if (blogSubCategoryRef) filter.blogSubCategoryRef = blogSubCategoryRef;

    return await this.#repository.findAll(filter);
  }

  async getAllBlogForHome() {
    const filter = {
      $or: [
        { youtubeUrl: { $exists: false } },
        { youtubeUrl: null },
        { youtubeUrl: "" },
      ],
    };
    return await this.#repository.findAll(filter);
  }

  async getAllVideoBlog(payload) {
    const { tagRef } = payload;

    const filter = {
      youtubeUrl: { $exists: true, $ne: "" },
    };

    if (tagRef) filter.tagRef = tagRef;

    return await this.#repository.findAll(filter);
  }

  async getAllFacebookBlog(payload) {
    const { tagRef } = payload;

    const filter = {
      facebookUrl: {
        $exists: true,
        $ne: "",
        $nin: ["undefined", null],
      },
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
