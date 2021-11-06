import React from "react";
import Link from "next/link";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="relative p-12 mt-20 mb-8 text-center bg-[#202933] rounded-lg">
      <div className="absolute left-0 right-0 select-none -top-14">
        <Link href="https://saschamajewsky.de">
          <a rel="noreferrer" target="_blank">
            <Image
              unoptimized
              src={author?.photo.url}
              alt={author?.name}
              height="100px"
              width="100px"
              className="align-middle rounded-full"
            />
          </a>
        </Link>
      </div>
      <Link href="https://saschamajewsky.de">
        <a
          rel="noreferrer"
          target="_blank"
          className="my-4 text-xl font-bold text-white"
        >
          {author?.name}
        </a>
      </Link>
      <p className="text-lg text-white">{author?.bio}</p>
    </div>
  );
};

export default Author;
