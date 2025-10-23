const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BlogSubCategoryService = require("./blog.subcategory.service.js");
const { ensureNullIfUndefined } = require("../../utils/helpers.js");

class BlogSubCategoryController {
  createBlogSubCategory = withTransaction(async (req, res, next, session) => {
    console.log(req.body, "boday");
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      name: req.body.name,
      status: req.body.status,
      slug: req.body.slug,
      categoryRef: req.body.categoryRef,
      viewType: ensureNullIfUndefined(req.body.viewType),
    };
    const blogSubCategoryResult = await BlogSubCategoryService.createBlogSubCategory(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Blog SubCategory Created successfully",
      blogSubCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBlogSubCategory = catchError(async (req, res, next) => {
    const blogSubCategoryResult = await BlogSubCategoryService.getAllBlogSubCategory();
    const resDoc = responseHandler(
      200,
      "Get All Blog SubCategories",
      blogSubCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getBlogSubCategoryWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const blogSubCategory = await BlogSubCategoryService.getBlogSubCategoryWithPagination(
      payload
    );
    const resDoc = responseHandler(
      200,
      "Blog SubCategories retrieved successfully",
      blogSubCategory
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleBlogSubCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogSubCategoryResult = await BlogSubCategoryService.getSingleBlogSubCategory(id);
    const resDoc = responseHandler(
      201,
      "Single Blog SubCategory retrieved successfully",
      blogSubCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleBlogSubCategoryWithSlug = catchError(async (req, res, next) => {
    const slug = req.params.slug;
    const blogSubCategoryResult =
      await BlogSubCategoryService.getSingleBlogSubCategoryWithSlug(slug);
    const resDoc = responseHandler(
      201,
      "Single Blog SubCategory retrieved successfully",
      blogSubCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlogSubCategory = catchError(async (req, res, next, session) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      name: req.body.name,
      status: req.body.status,
      slug: req.body.slug,
      blogCategoryRef: req.body.blogCategoryRef,
      viewType: ensureNullIfUndefined(req.body.viewType),
    };
    const blogSubCategoryResult = await BlogSubCategoryService.updateBlogSubCategory(
      id,
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(201, "Blog SubCategory Updated successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlogSubCategoryStatus = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const blogSubCategoryResult = await BlogSubCategoryService.updateBlogSubCategoryStatus(
      id,
      status
    );
    const resDoc = responseHandler(
      201,
      "Blog SubCategory Status Updated successfully"
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteBlogSubCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogSubCategoryResult = await BlogSubCategoryService.deleteBlogSubCategory(id);
    const resDoc = responseHandler(200, "Blog SubCategory Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BlogSubCategoryController();
