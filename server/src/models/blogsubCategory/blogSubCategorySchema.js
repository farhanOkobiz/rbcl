const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const BlogSubCategorySchemaDef = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
    slug: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory", 
      required: true,
    },
    // viewType: {
    //   type: String,
    //   enum: ["top", "middle", "lowerMiddle", "bottom"],
    // },
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug
BlogSubCategorySchemaDef.pre("save", function (next) {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Create Mongoose Model
const BlogSubCategorySchema = mongoose.model(
  "BlogSubCategory",
  BlogSubCategorySchemaDef
);

module.exports = { BlogSubCategorySchema };
