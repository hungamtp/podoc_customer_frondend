/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import { FactoryDTO } from '@/services/type.dto';

type Props = {
  factory: FactoryDTO;
};
export default function Factory({ factory }: Props) {
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
                <b className="mb-0"> {factory.name}</b>
              </span>
              <span className="mb-0">{factory.location}</span>
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
                <div>{factory.price}</div>
              </div>
              <div>
                <div className="small-text text-muted mb-0 card-body-title">Size</div>
                <div>{factory.sizes.join(' , ')}</div>
              </div>
              <div>
                <div className="small-text text-muted mb-0 card-body-title">Area</div>
                <div>{factory.area.join(' , ')}</div>
              </div>
              <div>
                <div className="small-text card-body-title">Color</div>
                <ul className="list-unstyled mt-4 mb-0">
                  <li className="list-inline-item">
                    <a className="btn btn-sm btn-icon btn-pills btn-primary">
                      <span className="d-none">.</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-sm btn-icon btn-pills btn-danger">
                      <span className="d-none">.</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-sm btn-icon btn-pills btn-success">
                      <span className="d-none">.</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-sm btn-icon btn-pills btn-info">
                      <span className="d-none">.</span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-sm btn-icon btn-pills btn-secondary">
                      <span className="d-none">.</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
