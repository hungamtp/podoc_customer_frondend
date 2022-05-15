/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from '@/components/layouts';
import React from 'react';

type Props = {};

export default function ForgotPassword({}: Props) {
  return (
    <section className="bg-home d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-6">
            <div className="me-lg-5">
              <img src="asset/images/user/recovery.svg" className="img-fluid d-block mx-auto" alt="recovery" />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="card shadow rounded border-0">
              <div className="card-body">
                <h4 className="card-title text-center">Recover Account</h4>

                <form className="login-form mt-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className="text-muted">
                        Please enter your email address. You will receive a link to create a new password via email.
                      </p>
                      <div className="mb-3">
                        <label className="form-label">
                          Email address <span className="text-danger">*</span>
                        </label>
                        <div className="form-icon position-relative">
                          <i data-feather="mail" className="fea icon-sm icons"></i>
                          <input type="email" className="form-control ps-5" placeholder="Enter Your Email Address" name="email" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-grid">
                        <button className="btn btn-primary">Send</button>
                      </div>
                    </div>
                    <div className="mx-auto">
                      <p className="mb-0 mt-3">
                        <small className="text-dark me-2">Remember your password ?</small>{' '}
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
ForgotPassword.Layout = EmptyLayout;
