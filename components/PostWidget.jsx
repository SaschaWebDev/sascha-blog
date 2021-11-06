import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";

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
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {highLightedPosts?.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="flex-none w-16">
            <img
              src={post.featuredImage.url}
              height="60px"
              width="60px"
              alt={post.title}
              className="align-middle rounded-md"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} key={index}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
