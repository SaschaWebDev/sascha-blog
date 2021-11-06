import React from "react";

import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";

const PostPage = ({ post }) => {
  return (
    <>
      <div className="container px-10 mx-auto mb-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post?.author} />
            <CommentsForm slug={post?.slug} />
            <Comments slug={post?.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post?.slug}
                categories={post?.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

// Fetch data at build time
export function getStaticProps({ params }) {
  return getPostDetails(params.slug)
    .then((postData) => {
      return {
        props: {
          post: postData,
        },
      };
    })
    .catch((error) =>
      console.log("Error during SSG postdata fetching: ", error)
    );
}

// Allow Next.js to find all dynamic routes so it can rerender the html for all sites for static display at build time.
export function getStaticPaths() {
  return getPosts()
    .then((posts) => {
      return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
      };
    })
    .catch((error) =>
      console.log("Error during SSG possible path fetching: ", error)
    );
}
