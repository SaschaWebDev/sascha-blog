import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((fetchedCategories) =>
      setCategories(fetchedCategories)
    );
  }, []);

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">Categories</h3>
    </div>
  );
};

export default Categories;
