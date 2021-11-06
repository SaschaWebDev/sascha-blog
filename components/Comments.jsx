import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import parse from "html-react-parser";

import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="p-8 pb-12 mb-8 bg-[#202933] rounded-lg shadow-lg">
          <h3 className="pb-4 mb-8 text-xl font-semibold border-b border-[#424b55] text-gray-300 ">
            {comments.length} Comments
          </h3>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="pb-4 mb-4 border-b border-gray-100 border-[#424b55]"
            >
              <p className="mb-4 text-gray-300">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {format(new Date(comment?.createdAt), "MMM dd, yyyy")}
              </p>
              <p className="w-full text-gray-300 whitespace-pre-line ">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
