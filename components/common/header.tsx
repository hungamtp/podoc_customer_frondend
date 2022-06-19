/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Badge } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/components/hooks/reduxHook';
import { setCart } from '@/redux/slices/cart';
import { CartDetailDTO } from '@/services/type.dto';
type Props = {};

export default function Header({}: Props) {
  const [itemCount, setItemCount] = React.useState(1);
  const cart = useAppSelector(state => state.carts);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(setCart([]))
    router.push('/login');
  };
  function toggleMenu(): void {
    var isOpen = document.getElementById('navigation');
    if (isOpen) {
      if (isOpen.style.display === 'block') {
        isOpen.style.display = 'none';
      } else {
        isOpen.style.display = 'block';
      }
    }
  }
  const router = useRouter();
  return (
    <div>
      <div id="topnav" className="defaultscroll sticky">
        <div className="container">
          <a className="logo" href="/">
            <img src="asset/images/logo-dark.png" height="24" className="logo-light-mode" alt="" />
          </a>

          <div className="menu-extras">
            <div className="menu-item">
              <a className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0">
            <li className="list-inline-item mb-0">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-icon btn-pills btn-primary  dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Badge color="secondary" badgeContent={cart.length}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                  </Badge>
                </button>

                <div
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-1 p-4"
                  style={{ width: '300px' }}
                >
                  <div className="pb-4">
                    {cart?.slice(0, 3).map(cart => {
                      return (
                        <a key={cart.id} href=" " className="d-flex align-items-center">
                          <img src={cart.designedImage} className="shadow rounded" style={{ maxHeight: '64px' }} alt="" />
                          <div className="flex-1 text-start ms-3">
                            <h6 className="text-dark mb-0">
                              {cart.designedProductName} ({cart.size})
                            </h6>
                            <p className="text-muted mb-0">
                              ${cart.price} X {cart.quantity}
                            </p>
                          </div>
                          <h6 className="text-dark mb-0">${cart.price * cart.quantity}</h6>
                        </a>
                      );
                    })}
                    <div
                      className="text-dark mb-0  "
                      style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', fontStyle: 'italic' }}
                    >
                      You have {cart.length} product in cart
                    </div>
                  </div>

                  <div className="  text-center">
                    <a href="/carts" className="btn btn-primary me-2">
                      View Cart
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-inline-item mb-0"> &nbsp;</li>

            <li className="list-inline-item mb-0">
              <div className="dropdown dropdown-primary">
                <button
                  type="button"
                  className="btn btn-icon btn-pills btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </button>
                <div
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-1 py-3"
                  style={{ width: '200px' }}
                >
                  <a className="dropdown-item text-dark" href="#">
                    <i className="uil uil-user align-middle me-1"></i> Tài khoản
                  </a>
                  <a className="dropdown-item text-dark" href="/mydesign">
                    <i className="bi bi-suit-heart me-1"></i>
                    Thiết kế của tôi
                  </a>
                  <a className="dropdown-item text-dark" href="#">
                    <i className="uil uil-clipboard-notes align-middle me-1"></i> Lịch sử mua hàng
                  </a>
                  <div className="dropdown-divider my-3 border-top"></div>
                  <a className="dropdown-item text-dark" onClick={logout}>
                    <i className="uil uil-sign-out-alt align-middle me-1"></i> Đăng xuất
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <div id="navigation">
            <ul className="navigation-menu">
              <li>
                <a href="/designs" className="sub-menu-item">
                  Thiết kế có sẵn
                </a>
              </li>

              <li onClick={() => router.push('/raw-products')}>
                <a href="raw-products" className="sub-menu-item">
                  Tự thiết kế
                </a>
              </li>
              <li onClick={() => router.push('/about')}>
                <a href="about" className="sub-menu-item">
                  Giới thiệu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
