/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Badge } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

export default function Header({}: Props) {
  const [itemCount, setItemCount] = React.useState(1);
  const logout = () => {
    localStorage.removeItem('jwt');
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
            <img src="asset/images/logo-light.png" height="24" className="logo-dark-mode" alt="" />
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
            <li className="list-inline-item mb-0 pe-1">
              <a href=" " data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <i className="uil uil-search h5 text-dark align-middle"></i>
              </a>
            </li>
            <li className="list-inline-item mb-0">&nbsp;</li>
            <li className="list-inline-item mb-0">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-icon btn-pills btn-primary  dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Badge color="secondary" badgeContent={itemCount}>
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
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 p-4"
                  style={{ width: '300px' }}
                >
                  <div className="pb-4">
                    <a href=" " className="d-flex align-items-center">
                      <img src="asset/images/shop/product/s-1.jpg" className="shadow rounded" style={{ maxHeight: '64px' }} alt="" />
                      <div className="flex-1 text-start ms-3">
                        <h6 className="text-dark mb-0">T-shirt (M)</h6>
                        <p className="text-muted mb-0">$320 X 2</p>
                      </div>
                      <h6 className="text-dark mb-0">$640</h6>
                    </a>

                    <a href=" " className="d-flex align-items-center mt-4">
                      <img src="asset/images/shop/product/s-2.jpg" className="shadow rounded" style={{ maxHeight: '64px' }} alt="" />
                      <div className="flex-1 text-start ms-3">
                        <h6 className="text-dark mb-0">Bag</h6>
                        <p className="text-muted mb-0">$50 X 5</p>
                      </div>
                      <h6 className="text-dark mb-0">$250</h6>
                    </a>

                    <a href=" " className="d-flex align-items-center mt-4">
                      <img src="asset/images/shop/product/s-3.jpg" className="shadow rounded" style={{ maxHeight: '64px' }} alt="" />
                      <div className="flex-1 text-start ms-3">
                        <h6 className="text-dark mb-0">Watch (Men)</h6>
                        <p className="text-muted mb-0">$800 X 1</p>
                      </div>
                      <h6 className="text-dark mb-0">$800</h6>
                    </a>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                    <h6 className="text-dark mb-0">Total($):</h6>
                    <h6 className="text-dark mb-0">$1690</h6>
                  </div>

                  <div className="mt-3 text-center">
                    <a href="/cart" className="btn btn-primary me-2">
                      View Cart
                    </a>
                    <a href="/checkout" className="btn btn-primary">
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-inline-item mb-0"> &nbsp;</li>

            <li className="list-inline-item mb-0">
              <button type="button" className="btn btn-icon btn-pills btn-primary" aria-haspopup="true" aria-expanded="false">
                <Badge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  color="secondary"
                  badgeContent={itemCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </Badge>
              </button>
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
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 py-3"
                  style={{ width: '200px' }}
                >
                  <a className="dropdown-item text-dark" href="#">
                    <i className="uil uil-user align-middle me-1"></i> Account
                  </a>
                  <a className="dropdown-item text-dark" href="#">
                    <i className="uil uil-clipboard-notes align-middle me-1"></i> Order History
                  </a>
                  <div className="dropdown-divider my-3 border-top"></div>
                  <a className="dropdown-item text-dark" onClick={logout}>
                    <i className="uil uil-sign-out-alt align-middle me-1"></i> Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <div id="navigation">
            <ul className="navigation-menu">
              <li>
                <a href="/" className="sub-menu-item">
                  Trang chủ
                </a>
              </li>

              <li onClick={() => router.push('/raw-products')}>
                <a href="raw-products" className="sub-menu-item">
                  Tự thiết kế
                </a>
              </li>
              <li onClick={() => router.push('/about')}>
                <a href="product" className="sub-menu-item">
                  Thiết kế sẵn
                </a>
              </li>

              <li onClick={() => router.push('/mydesign')}>
                <a href="mydesign" className="sub-menu-item">
                  Thiết kế của tôi
                </a>
              </li>
              <li onClick={() => router.push('/about')}>
                <a href="about" className="sub-menu-item">
                  Giới thiệu
                </a>
              </li>
              {/* <li className="has-submenu parent-menu-item">
                <a href=" ">Shop</a>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li onClick={() => router.push("/product")}>
                    <a href="product" className="sub-menu-item">
                      Product List Blueprint
                    </a>
                  </li>

                  <li>
                    <a href="shop-lists.html" className="sub-menu-item">
                      Product List Designed
                    </a>
                  </li>
                  <li>
                    <a
                      href="shop-product-detail.html"
                      className="sub-menu-item"
                    >
                      Product Details
                    </a>
                  </li>
                  <li>
                    <a href="cart" className="sub-menu-item">
                      Shop Cart
                    </a>
                  </li>
                  <li>
                    <a href="shop-checkouts.html" className="sub-menu-item">
                      Checkouts
                    </a>
                  </li>
                  <li>
                    <a href="shop-myaccount.html" className="sub-menu-item">
                      My Account
                    </a>
                  </li>
                </ul>
              </li> */}

              {/* <li className="has-submenu parent-menu-item">
                <a href=" ">Pages</a>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li onClick={() => router.push("/login")}>
                    <a href="login" className="sub-menu-item">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="auth-signup.html" className="sub-menu-item">
                      Signup
                    </a>
                  </li>
                  <li>
                    <a href="auth-re-password.html" className="sub-menu-item">
                      Reset Password
                    </a>
                  </li>
                  <li>
                    <a href="page-comingsoon.html" className="sub-menu-item">
                      Coming Soon
                    </a>
                  </li>
                  <li>
                    <a href="page-maintenance.html" className="sub-menu-item">
                      Maintenance
                    </a>
                  </li>
                  <li>
                    <a href="page-error.html" className="sub-menu-item">
                      Error
                    </a>
                  </li>
                  <li>
                    <a href="page-thankyou.html" className="sub-menu-item">
                      Thank you
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
