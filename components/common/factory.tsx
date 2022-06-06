/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';

export default function Factory() {
  const router = useRouter();
  const startDesign = () => {
    router.push('/design');
  };
  return (
    <section className="factory">
      <div className="container">
        <div className="card">
          <div className="card-header card-factory-header">
            <div className="right-card-factory-header">
              <span style={{ marginRight: ' 20px' }}>
                <b className="mb-0">Factory Name</b>
              </span>
              <span className="mb-0">Location</span>
            </div>

            <div className="left-card-factory-header">
              <span>
                <button className="btn btn-primary btn-sm" onClick={startDesign}>
                  Start Design
                </button>
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="card-factory-body">
              <div className="card-factory-body-content">
                <div className="small-text text-muted mb-0 card-body-title">Price</div>
                <div>From 4$</div>
              </div>
              <div>
                <div className="small-text text-muted mb-0 card-body-title">Size</div>
                <div>S-3XL</div>
              </div>
              <div>
                <div className="small-text text-muted mb-0 card-body-title">Area</div>
                <div>Back and front</div>
              </div>
              <div>
                <div className="small-text card-body-title">Color</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
