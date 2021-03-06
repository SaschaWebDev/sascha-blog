import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((fetchedCategories) =>
      setCategories(fetchedCategories.reverse())
    );
  }, []);

  return (
    <div className="p-8 pb-12 mb-8 bg-[#202933] rounded-lg shadow-lg select-none">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b border-[#424b55] text-gray-300">
        Categories
      </h3>
      {categories.map((category, index) => (
        <Link href={`/category/${category.slug}`} key={index}>
          <span className="block pb-3 mb-3 text-gray-300 transition duration-500 cursor-pointer hover:text-white">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
