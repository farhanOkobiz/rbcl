import { TBlog } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { fileUrlGenerator } from "@/utils/helpers";
import { BlogDetailsSheet } from "./details";
import TruncatedHtml from "@/components/utils/truncated-html";
import { YouTubeModal } from "@/utils/YouTubeModal ";


export const columns: ColumnDef<TBlog>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.image && (
            <Image
              src={fileUrlGenerator(row.original.image)}
              alt={row.original.image || ""}
              width={600}
              height={200}
              className="w-32 object-cover"
            />
          )}
        </div>
      );
    },
  },
  {
    header: "Facebook URL",
    accessorKey: "facebookUrl",
    cell: ({ getValue }) => {
      const url = getValue<string>();
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {url}
        </a>
      ) : (
        <span className="text-gray-400">N/A</span>
      );
    },
  }
  ,
  {
    header: "YoutTube Video",
    accessorKey: "youtubeUrl",
    cell: ({ row }) => {

      const url = row.original.youtubeUrl
      if (!url) return <span className="text-gray-400">No video</span>;

      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      return <YouTubeModal url={url} />;
    }
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Blog Category",
    accessorKey: "blogCategoryRef",
    cell: ({ row }) =>
      typeof row.original.blogCategoryRef === "object"
        ? row.original.blogCategoryRef.name
        : "N/A",
  },
  {
    header: "Blog Subcategory",
    accessorKey: "blogSubCategoryRef",
    cell: ({ row }) =>
      typeof row.original.blogSubCategoryRef === "object"
        ? row.original.blogSubCategoryRef.name
        : "N/A",
  },
  {
    header: "Tags",
    accessorKey: "tags",
  },
  {
    header: "Author",
    accessorKey: "author",
  },
  {
    header: "Details",
    accessorKey: "details",
    cell: ({ row }) => {
      const description = row?.original?.details || "";
      return <TruncatedHtml html={description} maxLength={20} />;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <BlogDetailsSheet blog={row.original} />;
    },
  },
];
