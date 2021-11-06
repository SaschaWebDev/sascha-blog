import React, { useRef, useState, useEffect } from "react";

import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentElement = useRef();
  const nameElement = useRef();
  const emailElement = useRef();
  const storeDataElement = useRef();

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentElement.current;
    const { value: name } = nameElement.current;
    const { value: email } = emailElement.current;
    const { checked: storeData } = storeDataElement.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObject = {
      comment,
      name,
      email,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObject).then((response) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  useEffect(() => {
    nameElement.current.value = window.localStorage.getItem("name");
    emailElement.current.value = window.localStorage.getItem("email");
  }, []);

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b select-none">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentElement}
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameElement}
          className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailElement}
          className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataElement}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
            checked={storeData}
          />
          <label
            className="ml-2 text-gray-500 cursor-pointer"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All field are required.</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-blue-600 rounded-full cursor-pointer ease hover:bg-indigo-900"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment Submitted for Review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
