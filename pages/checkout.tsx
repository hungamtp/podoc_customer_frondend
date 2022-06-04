import { MainLayout } from '@/components/layouts';
import React from 'react';

type Props = {};

export default function Checkout({}: Props) {
  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> Checkouts </h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
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
                    Checkouts
                  </li>
                </ul>
              </nav>
            </div>
          </div>{' '}
          {/*end container*/}
        </section>
        {/*end section*/}
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* Hero End */}
        {/* Start */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-lg-4 order-md-last">
                <div className="card rounded shadow p-4 border-0">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0">Your cart</span>
                    <span className="badge bg-primary rounded-pill">3</span>
                  </div>
                  <ul className="list-group mb-3 border">
                    <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                      <div>
                        <h6 className="my-0">Product name</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$12</span>
                    </li>
                    <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                      <div>
                        <h6 className="my-0">Second product</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$8</span>
                    </li>
                    <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                      <div>
                        <h6 className="my-0">Third item</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$5</span>
                    </li>
                    <li className="d-flex justify-content-between bg-light p-3 border-bottom">
                      <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                      </div>
                      <span className="text-success">−$5</span>
                    </li>
                    <li className="d-flex justify-content-between p-3">
                      <span>Total (USD)</span>
                      <strong>$20</strong>
                    </li>
                  </ul>
                  <form>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Promo code" />
                      <button type="submit" className="btn btn-secondary">
                        Redeem
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-7 col-lg-8">
                <div className="card rounded shadow p-4 border-0">
                  <h4 className="mb-3">Billing address</h4>
                  <form className="needs-validation" noValidate>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" required />
                        <div className="invalid-feedback">Valid first name is required.</div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" required />
                        <div className="invalid-feedback">Valid last name is required.</div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <div className="input-group has-validation">
                          <span className="input-group-text bg-light text-muted border">@</span>
                          <input type="text" className="form-control" id="username" placeholder="Username" required />
                          <div className="invalid-feedback"> Your username is required. </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-muted">(Optional)</span>
                        </label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                        <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                        <div className="invalid-feedback">Please enter your shipping address.</div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address 2 <span className="text-muted">(Optional)</span>
                        </label>
                        <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                      </div>
                      <div className="col-md-5">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select className="form-select form-control" id="country" required>
                          <option value="1">Choose...</option>
                          <option>United States</option>
                        </select>
                        <div className="invalid-feedback">Please select a valid country.</div>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <select className="form-select form-control" id="state" required>
                          <option value="1">Choose...</option>
                          <option>California</option>
                        </select>
                        <div className="invalid-feedback">Please provide a valid state.</div>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input type="text" className="form-control" id="zip" required />
                        <div className="invalid-feedback">Zip code required.</div>
                      </div>
                    </div>
                    <div className="form-check mt-4 pt-4 border-top">
                      <input type="checkbox" className="form-check-input" id="same-address" />
                      <label className="form-check-label" htmlFor="same-address">
                        Shipping address is the same as my billing address
                      </label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="save-info" />
                      <label className="form-check-label" htmlFor="save-info">
                        Save this information for next time
                      </label>
                    </div>
                    <h4 className="mb-3 mt-4 pt-4 border-top">Payment</h4>
                    <div className="my-3">
                      <div className="form-check">
                        <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required />
                        <label className="form-check-label" htmlFor="credit">
                          Credit card
                        </label>
                      </div>
                      <div className="form-check">
                        <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                        <label className="form-check-label" htmlFor="debit">
                          Debit card
                        </label>
                      </div>
                      <div className="form-check">
                        <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                        <label className="form-check-label" htmlFor="paypal">
                          PayPal
                        </label>
                      </div>
                    </div>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input type="text" className="form-control" id="cc-name" required />
                        <small className="text-muted">Full name as displayed on card</small>
                        <div className="invalid-feedback">Name on card is required</div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input type="text" className="form-control" id="cc-number" required />
                        <div className="invalid-feedback">Credit card number is required</div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input type="text" className="form-control" id="cc-expiration" required />
                        <div className="invalid-feedback">Expiration date required</div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input type="text" className="form-control" id="cc-cvv" required />
                        <div className="invalid-feedback">Security code required</div>
                      </div>
                    </div>
                    <button className="w-100 btn btn-primary" type="submit">
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
        {/* End */}
      </div>
    </>
  );
}

Checkout.Layout = MainLayout;