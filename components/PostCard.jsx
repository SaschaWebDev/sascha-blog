import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="p-0 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="flex items-center justify-between w-full px-4 pt-4 mb-4 text-center lg:pt-0 lg:px-0">
        <div className="flex items-center justify-center w-auto mr-8 lg:mb-0 lg:w-auto">
          <img
            src={post.author.photo.url}
            alt=""
            height="30px"
            width="30px"
            className="align-middle rounded-full"
          />
          <Link
            href="https://saschamajewsky.de"
            rel="noreferrer"
            target="_blank"
          >
            <a className="inline ml-2 text-base text-gray-700 align-middle cursor-pointer hover:text-blue-500">
              {post.author.name}
            </a>
          </Link>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-6 h-6 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <div className="relative mb-6 overflow-hidden shadow-md pb-80">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg"
        />
      </div>
      <div className="mb-8 text-2xl font-semibold text-center transition duration-700 cursor-pointer hover:text-blue-600">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </div>

      <div className="px-4 mb-8 text-lg font-normal text-center text-gray-700 lg:px-20">
        {post.excerpt}
      </div>
      <div className="pb-8 text-center lg:pb-0">
        <Link href={`/post/${post.slug}`}>
          <span className="inline-block px-8 py-3 text-lg font-medium text-white transition duration-500 transform bg-blue-600 rounded-full cursor-pointer hover:-translate-y-1">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
