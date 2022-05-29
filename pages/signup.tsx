/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from '@/components/layouts';
import React, { useState } from 'react';

type Props = {};

export default function SignUp({}: Props) {
  const [accepted, setAccepted] = useState(false);
  return (
    <section className="bg-auth-home d-table w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-6">
            <div className="me-lg-5">
              <img src="asset/images/user/signup.svg" className="img-fluid d-block mx-auto" alt="suignup" />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="card shadow rounded border-0">
              <div className="card-body">
                <h4 className="card-title text-center">Signup</h4>
                <form className="login-form mt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          First name <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon position-relative">
                          <i data-feather="user" className="fea icon-sm icons"></i>
                          <input type="text" className="form-control ps-5" placeholder="First Name" name="s" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Last name <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon position-relative">
                          <i data-feather="user-check" className="fea icon-sm icons"></i>
                          <input type="text" className="form-control ps-5" placeholder="Last Name" name="s" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Your Email <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon position-relative">
                          <i data-feather="mail" className="fea icon-sm icons"></i>
                          <input type="email" className="form-control ps-5" placeholder="Email" name="email" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon position-relative">
                          <i data-feather="key" className="fea icon-sm icons"></i>
                          <input type="password" className="form-control ps-5" placeholder="Password" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" checked={accepted} id="flexCheckDefault" />
                          <label className="form-check-label">
                            I Accept{' '}
                            <a href="#" className="text-primary">
                              Terms And Condition
                            </a>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="d-grid">
                        <button className="btn btn-primary">Register</button>
                      </div>
                    </div>

                    <div className="col-lg-12 mt-4 text-center">
                      <h6>Or Signup With</h6>
                      <div className="row">
                        <div className="col-6 mt-3">
                          <div className="d-grid">
                            <a href="javascript:void(0)" className="btn btn-light">
                              <i className="mdi mdi-facebook text-primary"></i> Facebook
                            </a>
                          </div>
                        </div>

                        <div className="col-6 mt-3">
                          <div className="d-grid">
                            <a href="javascript:void(0)" className="btn btn-light">
                              <i className="mdi mdi-google text-danger"></i> Google
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-auto">
                      <p className="mb-0 mt-3">
                        <small className="text-dark me-2">Already have an account ?</small>{' '}
                        <a href="login" className="text-dark fw-bold">
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

SignUp.Layout = EmptyLayout;
