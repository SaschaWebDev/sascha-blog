import React from "react";
import Link from "next/link";
import format from "date-fns/format";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="mb-4 text-xl font-semibold text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="mb-4 font-semibold text-white text-md">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="pb-12 mb-8 bg-[#202933] rounded-lg shadow-lg lg:p-8">
        <div className="relative mb-6 overflow-hidden shadow-md select-none">
          <img
            src={post?.featuredImage.url}
            alt=""
            className="object-cover object-top w-full h-full rounded-t-lg shadow-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex justify-between w-full mb-8 select-none items-between">
            <div className="flex items-center justify-center lg:mr-8 lg:mb-0 lg:w-auto">
              <img
                alt={post?.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post?.author.photo.url}
              />
              <Link href="https://saschamajewsky.de">
                <a
                  className="inline ml-2 text-lg font-medium text-gray-400 align-middle cursor-pointer hover:text-[#cdd0dbd5] transition duration-500"
                  rel="noreferrer"
                  target="_blank"
                >
                  {post?.author.name}
                </a>
              </Link>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-6 h-6 mr-2 text-[#d4d8e4ad]"
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
              <span className="text-lg text-gray-400 align-middle">
                {post
                  ? format(new Date(post.createdAt), "MMM dd, yyyy")
                  : "Unknown"}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold text-gray-300 transition duration-700 hover:text-white">
            {post?.title}
          </h1>
          {post?.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) =>
              getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
