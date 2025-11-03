"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Select as AntSelect, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { z } from "zod";
import { FileUp, Paperclip } from "lucide-react";
import { humanFileSize, makeFormData } from "@/utils/helpers";
import { createFormAction } from "./actions";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getBlogFormSchema } from "./form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BlogFormValues = z.infer<ReturnType<typeof getBlogFormSchema>>;

const defaultValues: BlogFormValues = {
  title: "",
  details: "",
  youtubeUrl: "",
  facebookUrl: "",
  blogType: "facebook",
  categoryRef: "",
  subCategoryRef: "",
  image: [],
  tags: [],
  author: "",
  featured: false,
};

type TBlogCategory = {
  _id: string;
  name: string;
};

type TBlogSubCategory = {
  _id: string;
  name: string;
  categoryRef?: string | { _id: string; name: string };
};

type CreateBlogFormProps = {
  blogCategoryData: { result: TBlogCategory[] };
  blogSubCategoryData: { result: TBlogSubCategory[] };
};

export const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  blogCategoryData,
  blogSubCategoryData,
}) => {
  const { toast } = useToast();
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const blogFormSchema = getBlogFormSchema(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  const { watch, control, setValue, getValues } = form;

  const selectedBlogType = watch("blogType") as
    | "facebook"
    | "youtube"
    | "article";
  const selectedCategoryId = watch("categoryRef");

  const handleThumbnailFileChange = ({ fileList }: any) => {
    setThumbnailFileList(fileList);
    const rawFiles = fileList
      .map((file: any) => file.originFileObj)
      .filter(Boolean);
    setValue("image", rawFiles);
  };

  const filteredSubCategories = React.useMemo(() => {
    if (!selectedCategoryId) return [];
    return (
      blogSubCategoryData?.result.filter((subCat) => {
        let catId: string;
        if (!subCat.categoryRef) return false;
        catId =
          typeof subCat.categoryRef === "string"
            ? subCat.categoryRef
            : subCat.categoryRef._id;
        return catId === selectedCategoryId;
      }) || []
    );
  }, [selectedCategoryId, blogSubCategoryData]);

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    setLoading(true);
    const formData = makeFormData({
      ...values,
      featured: values.featured ? "true" : "false",
      subCategoryRef: values.subCategoryRef || undefined,
    });

    try {
      await createFormAction(formData);
      form.reset();
      toast({ title: "Success", description: "Blog created successfully" });
      setThumbnailFileList([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-6 mt-1 p-4 rounded-lg">
      <Label className="text-xl font-semibold mb-4">Create Blog</Label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-2 py-2"
        >
          <div className="col-span-2">
            <div className="flex gap-4 w-full">
              {/* Blog Type */}
              <FormField
                control={control}
                name="blogType"
                render={({ field }) => (
                  <FormItem className="mb-3 flex-1">
                    <FormLabel>Blog Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Blog Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">
                            Facebook Blog
                          </SelectItem>
                          <SelectItem value="youtube">YouTube Blog</SelectItem>
                          <SelectItem value="article">Article Blog</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Blog Title */}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Category & Subcategory */}
            <div className="flex gap-4 w-full">
              <FormField
                control={control}
                name="categoryRef"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {blogCategoryData?.result.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
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
                          {filteredSubCategories.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Conditional Fields */}
            {selectedBlogType === "facebook" && (
              <FormField
                control={control}
                name="facebookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Facebook URL" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {selectedBlogType === "youtube" && (
              <FormField
                control={control}
                name="youtubeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter YouTube URL" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {selectedBlogType === "article" && (
              <>
                <FormField
                  control={control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Description</FormLabel>
                      <FormControl>
                        <ReactQuill {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Tags & Author */}
            <div className="flex gap-4 w-full mt-4">
              <Controller
                control={control}
                name="tags"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tags</FormLabel>
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="author"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Featured */}
            <FormField
              control={control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </FormControl>
                  <FormLabel>Mark as Featured</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="my-6" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>

          {/* Image Upload */}
          {selectedBlogType === "article" && (
            <div className="col-span-1">
              <Label>Blog Image (1 File)</Label>
              <FormField
                control={control}
                name="image"
                render={() => (
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    fileList={thumbnailFileList}
                    onChange={handleThumbnailFileChange}
                    multiple={false}
                  >
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                )}
              />

              {(() => {
                const files = getValues("image");
                if (!files || files.length === 0) return null;
                return (
                  <div className="mt-4">
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="border-dashed border-2 rounded-lg p-2 px-3 mb-2 text-xs text-gray-500"
                      >
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span>{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileUp className="h-4 w-4" />
                          <span>{humanFileSize(file.size)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
};
