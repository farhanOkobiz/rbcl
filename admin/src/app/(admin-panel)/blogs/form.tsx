"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Select as AntSelect } from "antd";

import { z } from "zod";

import { FileUp, Paperclip, Plus, Trash } from "lucide-react";
import { humanFileSize, makeFormData } from "@/utils/helpers";
import { createFormAction } from "./actions";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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

const defaultValues = {
  name: "",
  title: "",
  details: "",
  youtubeUrl: "",
  image: [],
  tags: [],
  author: "",
  featured: false,
};

type TBlogCategory = {
  _id: string;
  name: string;
  image: string;
  vectorImage: string;
  slug: string;
  status: boolean;
};

type TBlogSubCategory = {
  _id: string;
  name: string;
  slug: string;
  blogCategoryRef: string;
};

type CreateBlogFormProps = {
  blogCategoryData: {
    result: TBlogCategory[];
    pagination: any;
  };
  blogSubCategoryData: {
    result: TBlogSubCategory[];
    pagination: any;
  };
};

export const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  blogCategoryData,
  blogSubCategoryData,
}) => {
  const { toast } = useToast();

  const [thumbnailFileList, setThumbnailFileList] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const blogFormSchema = getBlogFormSchema(false);

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  const { control, register, watch, formState } = form;
  const selectedCategoryId = watch("categoryRef");

  const handleThumbnailFileChange = ({ fileList }: any) => {
    setThumbnailFileList(fileList);

    const rawFiles = fileList
      .map((file: any) => file.originFileObj)
      .filter(Boolean);

    // Sync with react-hook-form
    form.setValue("image", rawFiles);
  };

  // filtered subcategories
  const filteredSubCategories = React.useMemo(() => {
    if (!selectedCategoryId) return [];
    return blogSubCategoryData?.result.filter(
      (subCat) => subCat.categoryRef?._id === selectedCategoryId
    );
  }, [selectedCategoryId, blogSubCategoryData]);

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    setLoading(true);

    const formData = makeFormData({
      ...values,
      subCategoryRef: values.subCategoryRef || undefined,
      featured: values.featured ? "true" : "false",
    });

    try {
      await createFormAction(formData);

      form.reset();
      toast({
        title: "Success",
        description: "Product created successfully",
      });

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

  const [options, setOptions] = useState<{ value: string }[]>([]);

  return (
    <Card className="m-6 mt-1 p-4 rounded-lg">
      <Label className="text-xl font-semibold mb-4">Create Blogs</Label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-2 py-2"
        >
          {/* Text Inputs */}
          <div className="col-span-2">
            <FormField
              control={form.control}
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
                    {form.formState.errors.title?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="categoryRef"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Category<b className="text-[#52687f]">*</b>
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
                          {blogCategoryData?.result.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {form.formState.errors.categoryRef?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
                          <SelectValue placeholder="Select subcategory (Optional)" />
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
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {form.formState.errors.subCategoryRef?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Description</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Enter Blog description" {...field} /> */}
                    <ReactQuill {...field} />
                  </FormControl>
                  <FormDescription className="text-[#52687f] text-xs min-h-4">
                    {form.formState.errors.details?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

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

            <div className="flex gap-4 w-full">
              <Controller
                control={form.control}
                name="tags"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Add tags <b className="text-[#52687f]">*</b>
                    </FormLabel>
                    <FormControl>
                      <AntSelect
                        className="h-10"
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
                    <FormDescription className="text-[#52687f] text-xs min-h-4">
                      {form.formState.errors.tags?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                    {/* <FormDescription className="text-[#52687f] text-xs min-h-4">
                    {form.formState.errors.name?.message}
                  </FormDescription> */}
                  </FormItem>
                )}
              />
            </div>
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
            <Button type="submit" loading={loading} className="my-6">
              Create
            </Button>
          </div>

          {/* Image */}
          <div className="col-span-1 min-h-[500px] grid grid-cols-2">
            <div className="">
              <Label>Blog Image(1 File)</Label>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div>
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
                  </div>
                )}
              />

              <div className="mt-4">
                {form.getValues("image") &&
                  (form.getValues("image") ?? []).length > 0 &&
                  (form.getValues("image") ?? []).map((file, i) => (
                    <div className="border-dashed border-2 rounded-lg p-2 px-3">
                      <div
                        key={i}
                        className="flex flex-col gap-2 text-xs text-gray-500 justify-center h-full"
                      >
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
                {form.formState.errors.image?.message}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};
