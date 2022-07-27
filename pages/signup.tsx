/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from "@/components/layouts";
import { SignUpDTO } from "@/services/type.dto";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState } from "react";

import useSignup from "@/hooks/api/use-signup";

type Props = {};

export default function SignUp({}: Props) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .max(50, "Email tối đa 50 ký tự")
      .required("Email không được để trống"),
    password: yup
      .string()
      .min(8, "Mật khẩu cần ít nhất 8 ký tự")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .required("Mật khẩu không được để trống"),
    phone: yup
      .string()
      .trim()
      .matches(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        "Sai định dạng"
      )
      .required("Số điện thoại không được để trống"),
    firstName: yup
      .string()
      .min(2, "Họ cần ít nhất 2 ký tự")
      .max(20, "Họ tối đa 20 ký tự")
      .required(),
    lastName: yup
      .string()
      .min(2, "Tên cần ít nhất 2 ký tự")
      .max(50, "Tên tối đa 20 ký tự")
      .required(),
  });
  const { mutate: signUp, isLoading, error } = useSignup();
  const [accepted, setAccepted] = useState(false);
  const defaultValues: SignUpDTO = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
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
  const onSubmit: SubmitHandler<SignUpDTO> = (data) => {
    if (accepted) {
      data.firstName =
        data.firstName.charAt(0).toUpperCase() +
        data.firstName.slice(1).toLowerCase();
      data.lastName =
        data.lastName.charAt(0).toUpperCase() +
        data.lastName.slice(1).toLowerCase();
      data.email = data.email.trimStart().trimEnd();
      data.phone = data.phone.trimStart().trimEnd();
      const res = signUp(data);
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
        ""
      )}
      <section className="bg-auth-home d-table w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="me-lg-5">
                <img
                  src="/asset/images/user/signup.svg"
                  className="img-fluid d-block mx-auto"
                  alt="suignup"
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="card shadow rounded border-0">
                <div className="card-body">
                  <h4 className="card-title text-center">Đăng ký</h4>
                  <form
                    className="login-form mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Họ <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="user"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="text"
                              className="form-control ps-5"
                              placeholder="First Name"
                              {...register("firstName")}
                            />
                            {errors.firstName && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.firstName.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Tên <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="user-check"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="text"
                              className="form-control ps-5"
                              placeholder="Last Name"
                              {...register("lastName")}
                            />
                            {errors.lastName && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.lastName.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            SĐT <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="mail"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="phone"
                              className="form-control ps-5"
                              placeholder="Phone"
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.phone.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="mail"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="email"
                              className="form-control ps-5"
                              placeholder="Email"
                              {...register("email")}
                            />
                            {errors.email && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.email.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Mật Khẩu <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="key"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="password"
                              className="form-control ps-5"
                              placeholder="Password"
                              {...register("password")}
                            />
                            {errors.password && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.password.message}
                              </span>
                            )}
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
                              Tôi chấp nhận{" "}
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
                          <button
                            className={`${
                              !accepted ? "disabled " : " "
                            }btn btn-primary`}
                          >
                            Đăng ký
                          </button>
                        </div>
                      </div>

                      <div className="mx-auto">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Bạn đã có tài khoản
                          </small>{" "}
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
