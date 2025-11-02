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

  async getAllBlog(payload, page = 1, limit = 9) {
    const { tagRef, blogCategoryRef, blogSubCategoryRef } = payload;
    const filter = {}; // filter object

    const skip = (page - 1) * limit;

    if (tagRef) filter.tagRef = tagRef;
    if (blogCategoryRef) filter.blogCategoryRef = blogCategoryRef;
    if (blogSubCategoryRef) filter.blogSubCategoryRef = blogSubCategoryRef;

    // Get both blogs and total count
    const [blogs, total] = await Promise.all([
      this.#repository.findAllWithPaginationForClient(filter, skip, limit),
      this.#repository.count(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return {
      blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasMore,
      },
    };
    
  }

  async getAllBlogForHome() {
    const filter = {
      $and: [
        {
          $or: [
            { youtubeUrl: { $exists: false } },
            { youtubeUrl: null },
            { youtubeUrl: "" },
          ],
        },
        {
          $or: [
            { facebookUrl: { $exists: false } },
            { facebookUrl: null },
            { facebookUrl: "" },
          ],
        },
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

  async getAllLetestBlog(payload) {
    const { tagRef } = payload;

    const filter = {
      $or: [
        { facebookUrl: { $exists: false } },
        { facebookUrl: "" },
        { facebookUrl: null },
        { facebookUrl: "undefined" },
      ],
    };

    if (tagRef) filter.tagRef = tagRef;

    // Assuming `findAll` supports limit and sort
    return await this.#repository.findAll(filter, {
      sort: { createdAt: -1 }, // latest first
      limit: 4,
    });
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

    if (files && files.length > 0) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    if (
      !payload.blogSubCategoryRef ||
      payload.blogSubCategoryRef === "null" ||
      payload.blogSubCategoryRef === "undefined"
    ) {
      delete payload.blogSubCategoryRef;
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
