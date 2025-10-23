const { Router } = require("express");
const controller = require("../../modules/blogsubCategory/blog.subcategory.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const BlogSubCategoryRoute = Router();

// Uncomment the line below if JWT authentication is required
// BlogSubCategoryRoute.use(jwtAuth());

BlogSubCategoryRoute.route("/")
  .post(upload.any(), controller.createBlogSubCategory)
  .get(controller.getAllBlogSubCategory);

BlogSubCategoryRoute.get("/pagination", controller.getBlogSubCategoryWithPagination);

BlogSubCategoryRoute.route("/:slug").get(controller.getSingleBlogSubCategoryWithSlug);

BlogSubCategoryRoute.route("/:id")
  .get(controller.getSingleBlogSubCategory)
  .put(upload.any(), controller.updateBlogSubCategory)
  .delete(controller.deleteBlogSubCategory);

BlogSubCategoryRoute.put("/status/:id", controller.updateBlogSubCategoryStatus);

module.exports = BlogSubCategoryRoute;
