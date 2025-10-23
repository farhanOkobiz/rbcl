const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BlogCategoryService = require("./blogcategory.service.js");

class BlogCategoryController {
  createBlogCategory = withTransaction(async (req, res, next, session) => {
    console.log(req.body, "body");
    
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      name: req.body.name,
      slug: req.body.slug,
      status: req.body.status,
    };

    const blogCategoryResult = await BlogCategoryService.blogCreateCategory(
      payloadFiles,
      payload,
      session
    );

    const resDoc = responseHandler(
      201,
      "Blog Category created successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBlogCategory = catchError(async (req, res, next) => {
    const blogCategoryResult = await BlogCategoryService.getAllBlogCategory();
    const resDoc = responseHandler(
      200,
      "All Blog Categories fetched successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getBlogCategoryWithPagination = catchError(async (req, res, next) => {
    const payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };

    const blogCategory = await BlogCategoryService.getBlogCategoryWithPagination(payload);
    const resDoc = responseHandler(
      200,
      "Blog Categories fetched successfully (paginated)",
      blogCategory
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleBlogCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogCategoryResult = await BlogCategoryService.getSingleBlogCategory(id);
    const resDoc = responseHandler(
      200,
      "Single Blog Category fetched successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleBlogCategoryWithSlug = catchError(async (req, res, next) => {
    const slug = req.params.slug;
    const blogCategoryResult = await BlogCategoryService.getSingleBlogCategoryWithSlug(slug);
    const resDoc = responseHandler(
      200,
      "Single Blog Category fetched successfully by slug",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getBlogNavBar = catchError(async (req, res, next) => {
    const navBarResult = await BlogCategoryService.getBlogNavBar();
    const resDoc = responseHandler(
      200,
      "Blog Navbar fetched successfully",
      navBarResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlogCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      name: req.body.name,
      slug: req.body.slug,
      status: req.body.status,
      colorCode: req.body.colorCode,
    };

    const blogCategoryResult = await BlogCategoryService.updateBlogCategory(
      id,
      payloadFiles,
      payload
    );

    const resDoc = responseHandler(
      200,
      "Blog Category updated successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlogCategoryStatus = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;

    const blogCategoryResult = await BlogCategoryService.updateBlogCategoryStatus(
      id,
      status
    );

    const resDoc = responseHandler(
      200,
      "Blog Category status updated successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteBlogCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogCategoryResult = await BlogCategoryService.deleteBlogCategory(id);
    const resDoc = responseHandler(
      200,
      "Blog Category deleted successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BlogCategoryController();
