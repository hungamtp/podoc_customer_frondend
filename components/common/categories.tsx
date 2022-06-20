import React, { useState } from "react";
import useCategory from "@/hooks/api/use-category";
type Props = {
  handleCategoryChange: (value: string) => void;
};

export default function Categories({ handleCategoryChange }: Props) {
  const { data: categories, isLoading: isCategoryLoading } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="widget mt-4 pt-2">
      <h5 className="widget-title">Categories</h5>
      <ul className="list-unstyled mt-4 mb-0 blog-categories">
        <li
          className={`category ${selectedCategory == "" && "category-active"}`}
          value=""
          onClick={() => {
            setSelectedCategory("");
            handleCategoryChange("");
          }}
        >
          <h6>All categories</h6>
        </li>
        {categories?.map((category) => {
          return (
            <li
              className={`category ${
                selectedCategory == category.name && "category-active"
              }`}
              value={category.name}
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.name);
                handleCategoryChange(category.name);
              }}
            >
              <h6>{category.name}</h6>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
