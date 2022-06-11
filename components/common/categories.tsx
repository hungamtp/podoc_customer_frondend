import React from 'react';
import useCategory from '@/hooks/api/use-category';
type Props = {};

export default function Categories({}: Props) {
  const { data: categories, isLoading: isCategoryLoading } = useCategory();
  console.log(categories);
  return (
    <div className="widget mt-4 pt-2">
      <h5 className="widget-title">Categories</h5>
      <ul className="list-unstyled mt-4 mb-0 blog-categories">
        {categories?.map(category => {
          return (
            <li className="category" key={category.id}>
              <h6>{category.name}</h6>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
