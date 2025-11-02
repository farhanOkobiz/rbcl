"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SheetTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, MoreHorizontal, Paperclip } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TBlog } from "@/types/shared";
import { confirmation } from "@/components/modals/confirm-modal";
import { Select as AntSelect, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import ReactQuill from "react-quill";
import { deleteBlogAction, updateFormAction } from "./actions";
import { getBlogFormSchema } from "./form-schema";
import { getAllBlogCategory } from "@/services/blogcategory";
import { fileUrlGenerator, humanFileSize, makeFormData } from "@/utils/helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllBlogSubCategory } from "@/services/blog-sub-category";

interface Props {
  blog: TBlog;
}

export const BlogDetailsSheet: React.FC<Props> = ({ blog }) => {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: String(blog.image).split("/").pop() || "",
      status: "done",
      url: fileUrlGenerator(blog.image || ""),
    },
  ]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    fileUrlGenerator(blog.image || "")
  );
  const [blogCategories, setBlogCategories] = useState<any[]>([]);
  const [blogSubCategories, setBlogSubCategories] = useState<any[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const blogFormSchema = getBlogFormSchema(true);
  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog.title,
      categoryRef:
        typeof blog.blogCategoryRef === "string"
          ? blog.blogCategoryRef
          : blog.blogCategoryRef?._id,
      subCategoryRef:
        typeof blog.blogSubCategoryRef === "string"
          ? blog.blogSubCategoryRef
          : blog.blogSubCategoryRef?._id,
      details: blog.details,
      author: blog.author,
      tags: blog.tags,
      image: [],
      youtubeUrl: blog.youtubeUrl,
      facebookUrl: blog.facebookUrl,
      featured: blog.featured,
    },
  });

  const { control, watch, setValue, formState } = form;
  const selectedCategoryId = watch("categoryRef");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: categories } = await getAllBlogCategory();
        setBlogCategories(categories);

        const { data: subCategories } = await getAllBlogSubCategory();

        setBlogSubCategories(subCategories);

        setCategoriesLoaded(true);
      } catch (err) {
        console.error(err);
        setCategoriesLoaded(true);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      categoriesLoaded &&
      blog.blogCategoryRef &&
      blogSubCategories &&
      blogSubCategories.length > 0
    ) {
      const categoryId =
        typeof blog.blogCategoryRef === "string"
          ? blog.blogCategoryRef
          : blog.blogCategoryRef._id;

      const filtered = blogSubCategories.filter((sc: any) => {
        const catId =
          typeof sc.categoryRef === "string"
            ? sc.categoryRef
            : sc.categoryRef?._id;
        return catId === categoryId;
      });

      setFilteredSubCategories(filtered);

      setValue("categoryRef", categoryId);
      if (blog.blogSubCategoryRef) {
        const subCategoryId =
          typeof blog.blogSubCategoryRef === "string"
            ? blog.blogSubCategoryRef
            : blog.blogSubCategoryRef._id;
        setValue("subCategoryRef", subCategoryId);
      }
    }
  }, [
    categoriesLoaded,
    blogSubCategories,
    blog.blogCategoryRef,
    blog.blogSubCategoryRef,
    setValue,
  ]);

  useEffect(() => {
    if (!selectedCategoryId) {
      setFilteredSubCategories([]);
      setValue("subCategoryRef", "");
      return;
    }

    const filtered = blogSubCategories.filter((sc: any) => {
      let catId = sc.categoryRef;

      if (typeof catId === "object" && catId !== null) {
        catId = catId._id || catId.id || String(catId);
      }

      catId = String(catId);
      const selectedId = String(selectedCategoryId);

      return catId === selectedId;
    });

    setFilteredSubCategories(filtered);

    if (!filtered.some((sc: any) => sc._id === watch("subCategoryRef"))) {
      setValue("subCategoryRef", "");
    }
  }, [selectedCategoryId, blogSubCategories, setValue, watch]);

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
    const rawFiles = fileList
      .map((file: any) => file.originFileObj)
      .filter(Boolean);
    setValue("image", rawFiles);
  };

  const onSubmitUpdate = async (values: z.infer<typeof blogFormSchema>) => {
    setUpdating(true);
    const data = await makeFormData(values);
    try {
      await updateFormAction(String(blog._id), data);
      toast({ title: "Blog updated successfully" });
      setSheetOpen(false);
    } catch (error: any) {
      toast({
        title: "Failed to update blog",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = async () => {
    if (await confirmation("Are you sure you want to delete this blog?")) {
      setDeleting(true);
      const deleted = await deleteBlogAction(String(blog._id));
      if (deleted) {
        toast({ title: "Blog deleted successfully" });
        setSheetOpen(false);
      }
      setDeleting(false);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="sm:max-w-[750px] overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Blog Details</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitUpdate)}
            className="grid grid-cols-2 gap-2 items-end py-2"
          >
            <div className="col-span-2">
              {/* Blog Title */}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Blog Title <b className="text-[#52687f]">*</b>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog Title" {...field} />
                    </FormControl>
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {formState.errors.title?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Category & Subcategory */}
              <div className="flex items-center gap-4 w-full">
                <FormField
                  control={control}
                  name="categoryRef"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        Category <b className="text-[#52687f]">*</b>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {blogCategories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-[#52687f] text-xs min-h-4">
                        {formState.errors.categoryRef?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="subCategoryRef"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Subcategory</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredSubCategories.map((sub) => (
                              <SelectItem key={sub._id} value={sub._id}>
                                {sub.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-[#52687f] text-xs min-h-4">
                        {formState.errors.subCategoryRef?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Blog Description */}
              <FormField
                control={control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Description</FormLabel>
                    <FormControl>
                      <ReactQuill {...field} />
                    </FormControl>
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {formState.errors.details?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Facebook Video Link */}
              <FormField
                control={form.control}
                name="facebookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Video Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Facebook URL" {...field} />
                    </FormControl>
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {form.formState.errors.facebookUrl?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* YouTube Video Link */}
              <FormField
                control={form.control}
                name="youtubeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter YouTube video URL" {...field} />
                    </FormControl>
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {form.formState.errors.youtubeUrl?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Tags */}
              <Controller
                control={control}
                name="tags"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>
                      Add tags <b className="text-[#52687f]">*</b>
                    </FormLabel>
                    <FormControl>
                      <AntSelect
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Enter or select tags"
                        value={value || []}
                        onChange={(newTags) => {
                          const newOptions = newTags
                            .filter(
                              (tag) => !options.some((opt) => opt.value === tag)
                            )
                            .map((tag) => ({ value: tag }));
                          setOptions((prev) => [...prev, ...newOptions]);
                          onChange(newTags);
                        }}
                        options={options}
                      />
                    </FormControl>
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {formState.errors.tags?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload */}
            <div className="">
              <FormField
                control={control}
                name="image"
                render={() => (
                  <div>
                    <FormLabel>
                      Image <b className="text-[#52687f]">*</b>
                    </FormLabel>
                    <Upload
                      listType="picture-card"
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={handleFileChange}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </div>
                )}
              />
              <div className="mt-4">
                {(form.getValues("image") || []).map((file, i) => (
                  <div
                    key={i}
                    className="border-dashed border-2 rounded-lg p-2 px-3"
                  >
                    <div className="flex flex-col gap-2 text-xs text-gray-500 justify-center h-full">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileUp className="h-4 w-4 stroke-current" />
                        <span>{humanFileSize(file.size)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[#52687f] text-xs min-h-4">
                {formState.errors.image?.message}
              </div>
            </div>

            {/* Image Preview */}
            {selectedImageUrl ? (
              <Image
                src={selectedImageUrl}
                alt="blog"
                height={350}
                width={350}
                className="w-full aspect-square object-cover rounded-md"
              />
            ) : (
              <p>No Image</p>
            )}

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4 mt-1"
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Mark as Featured</FormLabel>
                  <FormDescription className="text-[#52687f] text-xs min-h-4">
                    {form.formState.errors.featured?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="mr-4 my-4 flex gap-2 col-span-2">
              <Button type="submit" variant="default" loading={updating}>
                Update
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteClick}
                loading={deleting}
              >
                Delete
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
