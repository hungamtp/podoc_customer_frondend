/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {};

export default function PageError({}: Props) {
  return (
    <>
      <div>
        <div className="back-to-home rounded d-none d-sm-block">
          <a href="index.html" className="btn btn-icon btn-soft-primary">
            <i data-feather="home" className="icons" />
          </a>
        </div>
        {/* ERROR PAGE */}
        <section className="bg-home d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12 text-center">
                <img src="asset/images/404.svg" className="img-fluid" alt="imageError" />
                <div className="text-uppercase mt-4 display-3">Oh ! no</div>
                <div className="text-capitalize text-dark mb-4 error-page">Page Not Found</div>
                <p className="text-muted para-desc mx-auto">
                  Start working with <span className="text-primary fw-bold">Landrick</span> that can provide everything you need to generate
                  awareness, drive traffic, connect.
                </p>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="row">
              <div className="col-md-12 text-center">
                <a href="index.html" className="btn btn-outline-primary mt-4">
                  Go Back
                </a>
                <a href="index.html" className="btn btn-primary mt-4 ms-2">
                  Go To Home
                </a>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
      </div>
    </>
  );
}
