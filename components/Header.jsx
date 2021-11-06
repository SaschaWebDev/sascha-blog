import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((fetchedCategories) =>
      setCategories(fetchedCategories)
    );
  }, []);

  return (
    <div className="container mx-auto mb-8 px-14">
      <div className="inline-block w-full py-8 border-b border-[#424b55]">
        <div className="block md:float-left">
          <Link href="/">
            <span className="text-4xl font-bold text-white cursor-pointer select-none">
              SaschaWebDev Blog
            </span>
          </Link>
        </div>
        <div className="hidden select-none md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
