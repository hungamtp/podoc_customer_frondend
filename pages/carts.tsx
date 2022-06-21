/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MainLayout } from '@/components/layouts';
import Cart from '@/components/common/cart';
import { setCartNotEnough , resetCartNotEnough } from '@/redux/slices/checkCart';
import { useAppSelector , useAppDispatch } from '@/components/hooks/reduxHook';
import useCheckCart from '@/hooks/api/cart/use-check-cart';
import { useRouter } from 'next/router';
type Props = {};

export default function Carts({}: Props) {
  const carts = useAppSelector(state => state.carts);
  const haveProduct = carts?.length != 0;
  const dispatch = useAppDispatch();
  const { mutate: checkCart, isLoading, error } = useCheckCart();
  const router = useRouter();
  const handleProceed = () =>{
  checkCart(carts , {onSuccess: (data) => {
      dispatch(setCartNotEnough(data))
      if(data.length == 0){
        dispatch(setCartNotEnough([]));
        router.push("/checkout")
      }
    }});
  
  }
  return (
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h2 className="title mb-0">Cart</h2>
              </div>
            </div>
          </div>

          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">
                  <a href="index.html">Print on demand</a>
                </li>
                <li className="breadcrumb-item active">Cart</li>
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
                {carts?.length == 0 ? (
                  <div>Have no product in cart</div>
                ) : (
                  <table className="table mb-0 table-center">
                    <thead>
                      <tr>
                        <th className="border-bottom py-3" style={{ minWidth: '20px' }}></th>
                        <th className="border-bottom text-start py-3" style={{ minWidth: '200px' }}>
                          Product
                        </th>
                        <th className="border-bottom text-center py-3" style={{ minWidth: '50px' }}>
                          Size
                        </th>
                        <th className="border-bottom text-center py-3" style={{ minWidth: '50px' }}>
                          Color
                        </th>
                        <th className="border-bottom text-center py-3" style={{ minWidth: '50px' }}>
                          Price
                        </th>
                        <th className="border-bottom text-center py-3" style={{ minWidth: '100px' }}>
                          Quantity
                        </th>
                        <th className="border-bottom text-end py-3 pe-4" style={{ minWidth: '100px' }}>
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
              </div>
              {haveProduct && (
                <div className="row">
                  <div className="col-lg-8 col-md-6 mt-4 pt-2">
                    <a href="designs" className="btn btn-primary">
                      Shop More
                    </a>
                  </div>
                  <div className="col-lg-4 col-md-6 ms-auto mt-4 pt-2">
                    <div className="table-responsive bg-white rounded shadow">
                      <table className="table table-center table-padding mb-0">
                        <tbody>
                          <tr>
                            <td className="h6 ps-4 py-3">Subtotal</td>
                            <td className="text-end fw-bold pe-4">$ {carts.reduce((totalSum, a) => totalSum + a.quantity * a.price, 0)}</td>
                          </tr>
                          <tr>
                            <td className="h6 ps-4 py-3">Coupon</td>
                            <td className="text-end fw-bold pe-4">
                              <div className="input-group">
                                <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                  <button className="btn btn-outline-secondary" type="button">Apply</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-light">
                            <td className="h6 ps-4 py-3">Total</td>
                            <td className="text-end fw-bold pe-4">$ {carts.reduce((totalSum, a) => totalSum + a.quantity * a.price, 0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 pt-2 text-end">
                      <button className="btn btn-primary" onClick={handleProceed}>
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
Carts.Layout = MainLayout;
