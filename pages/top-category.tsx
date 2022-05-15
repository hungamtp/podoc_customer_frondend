/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {};

function TopCategory({}: Props) {
  return (
    <div className="container mt-100 mt-60">
      <div className="row">
        <div className="col-12">
          <h5 className="mb-0">Top Categories</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
          <div className="card explore-feature border-0 rounded text-center bg-white">
            <div className="card-body">
              <img src="asset/images/shop/categories/fashion.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
              <div className="content mt-3">
                <h6 className="mb-0">
                  <a href="javascript:void(0)" className="title text-dark">
                    Fashion
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
          <div className="card explore-feature border-0 rounded text-center bg-white">
            <div className="card-body">
              <img src="asset/images/shop/categories/sports.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
              <div className="content mt-3">
                <h6 className="mb-0">
                  <a href="javascript:void(0)" className="title text-dark">
                    Sports
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
          <div className="card explore-feature border-0 rounded text-center bg-white">
            <div className="card-body">
              <img src="asset/images/shop/categories/music.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
              <div className="content mt-3">
                <h6 className="mb-0">
                  <a href="javascript:void(0)" className="title text-dark">
                    Music
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
          <div className="card explore-feature border-0 rounded text-center bg-white">
            <div className="card-body">
              <img src="asset/images/shop/categories/furniture.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
              <div className="content mt-3">
                <h6 className="mb-0">
                  <a href="javascript:void(0)" className="title text-dark">
                    Furniture
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
          <div className="card explore-feature border-0 rounded text-center bg-white">
            <div className="card-body">
              <img src="asset/images/shop/categories/electronics.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
              <div className="content mt-3">
                <h6 className="mb-0">
                  <a href="javascript:void(0)" className="title text-dark">
                    Electronics
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
          <div className="card explore-feature border-0 rounded text-center bg-white">
            <div className="card-body">
              <img src="asset/images/shop/categories/mobile.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
              <div className="content mt-3">
                <h6 className="mb-0">
                  <a href="javascript:void(0)" className="title text-dark">
                    Mobiles
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCategory;
