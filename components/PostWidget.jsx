import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";

import { getRecentPosts, getSimilarPosts } from "../services";

// This component either shows recent posts on the home page or shows related posts for a specific post

const PostWidget = ({ categories, slug }) => {
  const [highLightedPosts, setHighLightedPosts] = useState([]);

  useEffect(
    () =>
      slug
        ? getSimilarPosts(category).then((result) => setRelatedPosts(result))
        : getRecentPosts(category).then((result) => setRelatedPosts(result)),
    []
  );

  return <div>PostWidget</div>;
};

export default PostWidget;
