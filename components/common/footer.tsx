/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CartIcon from '../../icons/cart-icon';
import EyeIcon from '../../icons/eye-icon';
import HeaerIcon from '../../icons/heart-icon';

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-60">
              <div className="row">
                <div className="col-lg-3 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                  <p className="mt-4">Start working with Landrick that can provide everything you.</p>
                  <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                    <li className="list-inline-item">
                      <a href=" " className="rounded">
                        <HeaerIcon />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href=" " className="rounded">
                        <EyeIcon />
                      </a>
                    </li>

                    <li className="list-inline-item">
                      <a href=" " className="rounded">
                        <CartIcon />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12 mb-4 pb-2">
                      <h5 className="footer-head mb-0">Shopping & Clothes</h5>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12">
                      <ul className="list-unstyled footer-list">
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Men
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Jackets & Coats{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Jeans{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Loungewear{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Polo shirts{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Shirts
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12 mt-2 mt-sm-0">
                      <ul className="list-unstyled footer-list">
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Shorts{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Suits Swimwear{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> T-shirts{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Tracksuits{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Trousers
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Shirts
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12 mt-2 mt-sm-0">
                      <ul className="list-unstyled footer-list">
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> My account{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Order History{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Wish List{' '}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Newsletter
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Affiliate
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i> Returns
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12 mt-4 mt-lg-0 pt-2 pt-lg-0">
                  <h5 className="footer-head">Newsletter</h5>
                  <p className="mt-4">Sign up and receive the latest tips via email.</p>
                  <form>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="foot-subscribe mb-3">
                          <label className="form-label">
                            Write your email <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i className="bi bi-envelope"></i>
                            <input
                              type="email"
                              name="email"
                              id="emailsubscribe"
                              className="form-control ps-5 rounded"
                              placeholder="Your email : "
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="d-grid">
                          <input type="submit" id="submitsubscribe" name="send" className="btn btn-soft-primary" value="Subscribe" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-30 footer-border">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-truck align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Free delivery</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-archive align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Non-contact shipping</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-transaction align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Money-back quarantee</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-shield-check align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Secure payments</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-30 footer-border">
              <div className="container text-center">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <div className="text-sm-start">
                      <p className="mb-0">©2022-12-12 day la cho viet slogan</p>
                    </div>
                  </div>

                  <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <ul className="list-unstyled text-sm-end mb-0">
                      <li className="list-inline-item">
                        <a href=" ">
                          <img
                            src="asset/images/payments/american-ex.png"
                            className="avatar avatar-ex-sm"
                            title="American Express"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img src="asset/images/payments/discover.png" className="avatar avatar-ex-sm" title="Discover" alt="" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img src="asset/images/payments/master-card.png" className="avatar avatar-ex-sm" title="Master Card" alt="" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img src="asset/images/payments/paypal.png" className="avatar avatar-ex-sm" title="Paypal" alt="" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img src="asset/images/payments/visa.png" className="avatar avatar-ex-sm" title="Visa" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
