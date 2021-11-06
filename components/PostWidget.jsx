import React, { useState, useEffect } from "react";
import Link from "next/link";
import format from "date-fns/format";

import { getRecentPosts, getSimilarPosts } from "../services";

// This component either shows recent posts on the home page or shows related posts for a specific post

const PostWidget = ({ categories, slug }) => {
  const [highLightedPosts, setHighLightedPosts] = useState([]);

  useEffect(() => {
    slug
      ? getSimilarPosts(categories, slug).then((result) =>
          setHighLightedPosts(result)
        )
      : getRecentPosts().then((result) => setHighLightedPosts(result));
  }, [slug]);

  return (
    <div className="p-8 mb-8 bg-[#202933] text-gray-300 rounded-lg shadow-lg select-none">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b border-[#424b55]">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {highLightedPosts?.map((post, index) => (
        <div
          key={index}
          className="flex items-center w-full mb-4 cursor-pointer"
        >
          <div className="flex-none w-16">
            <Link href={`/post/${post?.slug}`} key={index}>
              <img
                src={post?.featuredImage.url}
                height="60px"
                width="60px"
                alt={post?.title}
                className="align-middle rounded-md"
              />
            </Link>
          </div>
          <div className="flex-grow ml-4 group">
            <Link href={`/post/${post?.slug}`} key={index}>
              <p className="text-[#d4d8e4ad] font-xs">
                {format(new Date(post?.createdAt), "MMM dd, yyyy")}
              </p>
            </Link>
            <Link href={`/post/${post?.slug}`} key={index}>
              <div className="text-base font-medium text-gray-300 transition duration-500 group-hover:text-white">
                {post?.title}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
