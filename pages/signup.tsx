/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from "@/components/layouts";
import { SignUpDTO } from "@/services/type.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useState } from "react";

import useSignup from "@/hooks/api/use-signup";
import Link from "next/link";

type Props = {};

export default function SignUp({}: Props) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Email không đúng định dạng")
      .max(50, "Email tối đa 50 ký tự")
      .required("Email không được để trống"),
    password: yup
      .string()
      .trim()
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
      .trim()
      .max(20, "Tên tối đa 20 ký tự")
      .required("Tên không được để trống"),
    lastName: yup
      .string()
      .trim()
      .max(50, "Họ tối đa 20 ký tự")
      .required("Họ không được để trống"),
  });
  const { mutate: signUp, isLoading, error } = useSignup();
  const [accepted, setAccepted] = useState(false);
  const [seePassword, setSeePassword] = useState("password");
  const handleSeePassword = () => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  };
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
                              className="bi bi-person position-absolute mt-2 ms-3"
                            ></i>
                            <input
                              type="text"
                              className="form-control ps-5"
                              placeholder="Họ"
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

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Tên <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="user-check"
                              className="bi bi-person-check position-absolute mt-2 ms-3"
                            ></i>
                            <input
                              type="text"
                              className="form-control ps-5"
                              placeholder="Tên"
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

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            SĐT <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="mail"
                              className="bi bi-telephone position-absolute mt-2 ms-3"
                            ></i>
                            <input
                              type="phone"
                              className="form-control ps-5"
                              placeholder="Số điện thoại"
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
                              className="bi bi-envelope position-absolute mt-2 ms-3"
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
                            {error && error.response && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {error.response.data?.errorMessage &&
                                  "Email đã tồn tại"}
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
                              className="bi bi-key position-absolute mt-2 ms-3"
                            ></i>
                            <input
                              type={seePassword}
                              className="form-control ps-5"
                              placeholder="Mật khẩu"
                              {...register("password")}
                            />
                            <span
                              className="cursor-pointer position-absolute top-50 end-0 translate-middle-y me-3"
                              onClick={handleSeePassword}
                            >
                              {seePassword === "password" ? (
                                <i className={`bi bi-eye`} />
                              ) : (
                                <i className={`bi bi-eye-slash`} />
                              )}
                            </span>
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
                          <Link href="login">
                            <a className="text-dark fw-bold">Đăng nhập</a>
                          </Link>
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
