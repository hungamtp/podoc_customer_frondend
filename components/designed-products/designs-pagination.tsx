import * as React from "react";

export interface IDesignsPaginationProps {}

export default function DesignsPagination(props: IDesignsPaginationProps) {
  return (
    <div>
      <div className="row">
        {/* PAGINATION START */}
        <div className="col-12 mt-4 pt-2">
          <ul className="pagination justify-content-center mb-0">
            <li className="page-item">
              <a className="page-link" href=" " aria-label="Previous">
                <i className="mdi mdi-arrow-left" /> Prev
              </a>
            </li>
            <li className="page-item active">
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
            </li>
            <li className="page-item">
              <a className="page-link" href=" " aria-label="Next">
                Next <i className="mdi mdi-arrow-right" />
              </a>
            </li>
          </ul>
        </div>
        {/*end col*/}
        {/* PAGINATION END */}
      </div>
    </div>
  );
}
