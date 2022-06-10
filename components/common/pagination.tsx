import { type } from 'os';
import React, { useState } from 'react';
type Props = {
  currentPage: number;
  pages: number;
};
function renderPage(pages: number, currentPage: number) {
  let page = [];

  for (var i = 1; i <= pages; i++) {
    page.push(
      <li key={i} className={i == currentPage ? 'page-item' : 'page-item active'}>
        <a className="page-link" href=" ">
          {i}
        </a>
      </li>
    );
    return page;
  }
}

export default function Pagination({ currentPage, pages }: Props) {
  const [page, setPage] = useState(currentPage);
  // fucntion renderPage(pages): number[]  {
  //   let page = [];
  //   for (let i = 1; i <= pages; i++) {
  //     page.push(i);
  //   }
  //   return page;
  // };
  return (
    <div className="col-12 mt-4 pt-2">
      <ul className="pagination justify-content-center mb-0">
        <li className={currentPage == 0 ? 'page-item disabled' : 'page-item'}>
          <a className="page-link" href=" " aria-label="Previous">
            <i className="mdi mdi-arrow-left" /> Prev
          </a>
        </li>
        {renderPage(pages, currentPage)}
        {/* <li className="page-item active">
          <a className="page-link" href=" ">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href=" ">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href=" ">
            3
          </a>
        </li> */}
        <li className={currentPage == pages ? 'page-item disabled' : 'page-item'}>
          <a className="page-link" href=" " aria-label="Next">
            Next <i className="mdi mdi-arrow-right" />
          </a>
        </li>
      </ul>
    </div>
  );
}
