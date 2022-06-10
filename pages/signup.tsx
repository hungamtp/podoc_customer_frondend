/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from '@/components/layouts';
import { SignUpDTO } from '@/services/type.dto';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import React, { useState } from 'react';

import useSignup from '@/hooks/api/use-signup';

type Props = {};

export default function SignUp({}: Props) {
  const schema = yup.object().shape({
    email: yup.string().email().min(8, 'Email cần ít nhất 8 ký tự').max(50, 'Email tối đa 50 ký tự').required('Email không được để trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu cần ít nhất 8 ký tự')
      .max(50, 'Mật khẩu tối đa 50 ký tự')
      .required('Mật khẩu không được để trống'),
    phone: yup.string().min(9).max(11).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });
  const { mutate: signUp, isLoading, error } = useSignup();
  const [accepted, setAccepted] = useState(false);
  const defaultValues: SignUpDTO = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpDTO>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignUpDTO> = data => {
    if (accepted) {
      data.firstName = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase();
      data.lastName = data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1).toLowerCase();
      data.email = data.email.trimStart().trimEnd();
      data.phone = data.phone.trimStart().trimEnd();
      const res = signUp(data);
      console.log(res);
    } else {
    }
  };
  return (
    <>
      {isLoading ? (
        <div id="preloader">
          <div id="status">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
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
                  <h4 className="card-title text-center">Đăng ký</h4>
                  <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Họ <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i data-feather="user" className="fea icon-sm icons"></i>
                            <input type="text" className="form-control ps-5" placeholder="First Name" {...register('firstName')} />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Tên <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i data-feather="user-check" className="fea icon-sm icons"></i>
                            <input type="text" className="form-control ps-5" placeholder="Last Name" {...register('lastName')} />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            SĐT <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i data-feather="mail" className="fea icon-sm icons"></i>
                            <input type="phone" className="form-control ps-5" placeholder="Phone" {...register('phone')} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i data-feather="mail" className="fea icon-sm icons"></i>
                            <input type="email" className="form-control ps-5" placeholder="Email" {...register('email')} />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Mật Khẩu <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i data-feather="key" className="fea icon-sm icons"></i>
                            <input type="password" className="form-control ps-5" placeholder="Password" {...register('password')} />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              onClick={() => setAccepted(!accepted)}
                              type="checkbox"
                              checked={accepted}
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label">
                              Tôi chấp nhận{' '}
                              <a href="#" className="text-primary">
                                điều khoản và điều kiện
                              </a>
                            </label>
                          </div>
                        </div>
                        {error && (
                          <span id="error-pwd-message" className="text-danger">
                            {error.response?.data.errorMessage}
                          </span>
                        )}
                      </div>

                      <div className="col-md-12">
                        <div className="d-grid">
                          <button className={`${!accepted ? 'disabled ' : ' '}btn btn-primary`}>Đăng ký</button>
                        </div>
                      </div>

                      <div className="col-lg-12 mt-4 text-center">
                        <h6>Hoặc đăng ký bằng</h6>
                        <div className="row">
                          <div className="col-6 mt-3">
                            <div className="d-grid">
                              <a href=" " className="btn btn-light">
                                <i className="mdi mdi-facebook text-primary"></i> Facebook
                              </a>
                            </div>
                          </div>

                          <div className="col-6 mt-3">
                            <div className="d-grid">
                              <a href=" " className="btn btn-light">
                                <i className="mdi mdi-google text-danger"></i> Google
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mx-auto">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">Bạn đã có tài khoản</small>{' '}
                          <a href="login" className="text-dark fw-bold">
                            Đăng nhập
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
    </>
  );
}

SignUp.Layout = EmptyLayout;
