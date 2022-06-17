/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MainLayout } from '@/components/layouts';
import Cart from '@/components/common/cart';
import useCart from '@/hooks/api/cart/use-cart';

import { useAppSelector } from '@/components/hooks/reduxHook';
type Props = {};

export default function Carts({}: Props) {
  const carts = useAppSelector(state => state.carts);
  const haveProduct = carts?.length != 0;

  return (
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h4 className="title mb-0"> Shopping Cart </h4>
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
                  <a href="home">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Cart
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
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bg-white shadow rounded"></div>
            </div>
          </div>

          {carts?.length == 0 ? (
            <div>chuwa cos san pham trong cac</div>
          ) : (
            <table className="table mb-0 table-center">
              <thead>
                <tr>
                  <th className="border-bottom py-3" style={{ minWidth: '20px' }}></th>
                  <th className="border-bottom text-start py-3" style={{ minWidth: '300px' }}>
                    Product
                  </th>
                  <th className="border-bottom text-center py-3" style={{ minWidth: '60px' }}>
                    Size
                  </th>
                  <th className="border-bottom text-center py-3" style={{ minWidth: '60px' }}>
                    Color
                  </th>
                  <th className="border-bottom text-center py-3" style={{ minWidth: '60px' }}>
                    Price
                  </th>
                  <th className="border-bottom text-center py-3" style={{ minWidth: '160px' }}>
                    Qty
                  </th>
                  <th className="border-bottom text-end py-3 pe-4" style={{ minWidth: '160px' }}>
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {carts?.map(cart => {
                  return <Cart key={cart.id} cart={cart} />;
                })}
              </tbody>
            </table>
          )}
          {haveProduct && (
            <div className="row">
              <div className="col-lg-8 col-md-6 mt-4 pt-2">
                <a href="designs" className="btn btn-primary">
                  Shop More
                </a>
                <a href=" " className="btn btn-soft-primary ms-2">
                  Update Cart
                </a>
              </div>
              <div className="col-lg-4 col-md-6 ms-auto mt-4 pt-2">
                <div className="table-responsive bg-white rounded shadow">
                  <table className="table table-center table-padding mb-0">
                    <tbody>
                      <tr>
                        <td className="h6 ps-4 py-3">Subtotal</td>
                        <td className="text-end fw-bold pe-4">$ 2190</td>
                      </tr>
                      <tr>
                        <td className="h6 ps-4 py-3">Taxes</td>
                        <td className="text-end fw-bold pe-4">$ 219</td>
                      </tr>
                      <tr className="bg-light">
                        <td className="h6 ps-4 py-3">Total</td>
                        <td className="text-end fw-bold pe-4">$ 2409</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 pt-2 text-end">
                  <a href="checkout" className="btn btn-primary">
                    Proceed to checkout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
Carts.Layout = MainLayout;
