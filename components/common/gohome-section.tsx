import Link from "next/link";
import * as React from "react";

export interface IGoHomeSectionProps {}

export default function GoHomeSection(props: IGoHomeSectionProps) {
  return (
    <>
      <div className="container-fluid mt-100 mt-60 px-0">
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    href="/"
                    className="btn btn-lg btn-pills btn-icon btn-soft-primary"
                  >
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home icons"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
