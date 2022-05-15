/* eslint-disable @next/next/no-img-element */
import { MainLayout } from '@/components/layouts';
import React from 'react';

type Props = {};

export default function About({}: Props) {
  return (
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h4 className="title mb-0"> About Us </h4>
              </div>
            </div>
          </div>

          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">
                  <a href="index.html">Landrick</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="index-shop.html">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="section-title text-center">
                <h4 className="title mb-4">Aliquam viverra tellus a urna facilisis bibendum</h4>
                <p className="text-muted mb-0">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                  quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                  voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius
                  modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4">Featured Services</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Start working with <span className="text-primary fw-bold">Landrick</span> that can provide everything you need to generate
                  awareness, drive traffic, connect.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mt-4 pt-2">
              <div className="card features feature-clean bg-transparent process-arrow border-0 text-center">
                <div className="icons text-primary text-center mx-auto">
                  <i className="uil uil-rocket d-block rounded h3 mb-0"></i>
                </div>

                <div className="card-body">
                  <h5 className="text-dark">Free Shipping</h5>
                  <p className="text-muted mb-0">The most well-known dummy text is the Lorem Ipsum, which is said to have originated</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 pt-2">
              <div className="card features feature-clean bg-transparent process-arrow border-0 text-center">
                <div className="icons text-primary text-center mx-auto">
                  <i className="uil uil-user-arrows d-block rounded h3 mb-0"></i>
                </div>

                <div className="card-body">
                  <h5 className="text-dark">24/7 Support</h5>
                  <p className="text-muted mb-0">The most well-known dummy text is the Lorem Ipsum, which is said to have originated</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 pt-2">
              <div className="card features feature-clean bg-transparent process-arrow border-0 text-center">
                <div className="icons text-primary text-center mx-auto">
                  <i className="uil uil-transaction d-block rounded h3 mb-0"></i>
                </div>

                <div className="card-body">
                  <h5 className="text-dark">Payment Process</h5>
                  <p className="text-muted mb-0">The most well-known dummy text is the Lorem Ipsum, which is said to have originated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col-md-6">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img src="asset/images/shop/fea1.jpg" className="img-fluid" alt="" />
                <div className="category-title ms-md-4 ms-2">
                  <h4>
                    Street style has its own <br /> rules
                  </h4>
                  <a href="javascript:void(0)" className="btn btn-sm btn-soft-primary mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img src="asset/images/shop/fea2.jpg" className="img-fluid" alt="" />
                <div className="category-title ms-md-4 ms-2">
                  <h4>
                    Old style in a new <br /> edition
                  </h4>
                  <a href="javascript:void(0)" className="btn btn-sm btn-soft-primary mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-4 pt-2">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img src="asset/images/shop/fea4.jpg" className="img-fluid" alt="" />
                <div className="category-title ms-md-4 ms-2">
                  <h4>Summer Collection</h4>
                  <a href="javascript:void(0)" className="btn btn-sm btn-soft-primary mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

About.Layout = MainLayout;
