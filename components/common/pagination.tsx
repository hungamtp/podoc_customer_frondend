import React, { useState } from 'react';
type Props = {
  currentPage: number;
  pages: number;
};

export default function Pagination({ currentPage, pages }: Props) {
  const numbers = (pages: number): number[] => {
    let result = [];
    for (var i = 1; i <= pages; i++) {
      result.push(i);
    }
    return result;
  };
  return (
    <div className="col-12 mt-4 pt-2">
      <ul className="pagination justify-content-center mb-0">
        <li className={currentPage == 0 ? 'page-item disabled' : 'page-item'}>
          <span className="page-link" aria-label="Previous">
            <i className="mdi mdi-arrow-left" /> Prev
          </span>
        </li>
        {numbers(pages).map(page => {
          return (
            <li key={page} className={`page-item ${page == currentPage + 1 && 'active'} `}>
              <span className="page-link">{page}</span>
            </li>
          );
        })}

        <li className={currentPage == pages - 1 ? 'page-item disabled' : 'page-item'}>
          <a className="page-link" aria-label="Next">
            Next <i className="mdi mdi-arrow-right" />
          </a>
        </li>
      </ul>
    </div>
  );
}
