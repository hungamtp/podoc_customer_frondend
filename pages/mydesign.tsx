/* eslint-disable @next/next/no-img-element */
import Design from '@/components/common/design';
import { MainLayout } from '@/components/layouts';
import React, { useState } from 'react';

type Props = {};

export default function MyDesign({}: Props) {
  const numbers: number[] = [1, 2, 3, 4];
  const [selectAll, setSelectAll] = useState(false);
  return (
    <>
      <section className="bg-half-170 bg-primary d-table w-100">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h2 className="title mb-0">My Design</h2>
              </div>
            </div>
          </div>

          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">
                  <a href="index.html">Print on demand</a>
                </li>
                <li className="breadcrumb-item active">My Design</li>
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
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bg-white shadow rounded">
                <table className="table mb-0 table-center">
                  <thead>
                    <tr>
                      <th className="border-bottom py-3" style={{ minWidth: '20px' }}>
                        <input type="checkbox" name="select-all" id="select-all" />
                        {/* <label id="select-all-lb">Select All</label> */}
                      </th>
                      <th className="border-bottom text-start py-3" style={{ minWidth: '300px' }}>
                        Select all
                      </th>
                      <th className="border-bottom text-center py-3" style={{ minWidth: '160px' }}>
                        Price
                      </th>
                      <th className="border-bottom text-center py-3" style={{ minWidth: '160px' }}>
                        Status
                      </th>
                      <th className="border-bottom text-end py-3 pe-4" style={{ minWidth: '160px' }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    {numbers.map(number => {
                      return <Design key={number} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

MyDesign.Layout = MainLayout;
