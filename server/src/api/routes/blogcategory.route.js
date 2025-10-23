const { Router } = require("express");
const controller = require("../../modules/blogcategory/blogcategory.controller.js");
const { upload } = require("../../middleware/upload/upload.js");

const BlogCategoryRoute = Router();

// If authentication is needed in the future, uncomment below:
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
// BlogCategoryRoute.use(jwtAuth());

// Navbar route
BlogCategoryRoute.get("/navbar", controller.getBlogNavBar);

// Create & Get All Blog Categories
BlogCategoryRoute.route("/")
  .post(upload.any(), controller.createBlogCategory)
  .get(controller.getAllBlogCategory);

// Pagination route
BlogCategoryRoute.get("/pagination", controller.getBlogCategoryWithPagination);

// Get Blog Category by Slug
BlogCategoryRoute.route("/slug/:slug").get(controller.getSingleBlogCategoryWithSlug);

// Get, Update, Delete Blog Category by ID
BlogCategoryRoute.route("/:id")
  .get(controller.getSingleBlogCategory)
  .put(upload.any(), controller.updateBlogCategory)
  .delete(controller.deleteBlogCategory);

// Update Status
BlogCategoryRoute.put("/status/:id", controller.updateBlogCategoryStatus);

module.exports = BlogCategoryRoute;
