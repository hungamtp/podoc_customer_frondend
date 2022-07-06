/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetStaticPaths, GetStaticProps } from "next";
import useLogin from "@/hooks/api/use-login";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { login as loginAction } from "@/redux/slices/auth";
import { setCart } from "@/redux/slices/cart";
import useCart from "@/hooks/api/cart/use-cart";

type FormLogin = {
  email: string;
  password: string;
};

type Props = {
  data: any;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .min(8, "Email cần ít nhất 8 kí tự")
    .max(50, "Email tối đa 50 kí tự")
    .required("Email không được để trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(26, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
});
export default function Login({ data }: Props) {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  // const [error, setError] = React.useState(false);
  const { mutate: login, isLoading, error } = useLogin();
  const dispatch = useAppDispatch();
  const defaultValues: FormLogin = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormLogin>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { data: responseCart, isLoading: isCartLoading } = useCart();
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    data.email = data.email.trimStart().trimEnd();
    const res = login(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          dispatch(loginAction(data));
          dispatch(setCart(responseCart));
          router.back();
          // router.back();
        },
      }
    );
    if (rememberMe) {
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

      <div className="back-to-home rounded d-none d-sm-block">
        <a href="index.html" className="btn btn-icon btn-soft-primary">
          <i data-feather="home" className="icons"></i>
        </a>
      </div>

      <section className="bg-home d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="me-lg-5">
                <img
                  src="asset/images/user/login.svg"
                  className="img-fluid d-block mx-auto"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="card login-page bg-white shadow rounded border-0">
                <div className="card-body">
                  <h4 className="card-title text-center">Đăng nhập</h4>
                  <form
                    className="login-form mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="user"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="text"
                              className="form-control ps-5"
                              placeholder="Email"
                              {...register("email")}
                            />
                          </div>
                          {errors.email && (
                            <span id="error-pwd-message">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Mật khẩu <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i className="fea icon-sm icons"></i>
                            <input
                              type="password"
                              className="form-control ps-5"
                              placeholder="Mật khẩu"
                              {...register("password")}
                            />
                          </div>
                          {errors.password && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {errors.password.message}
                            </span>
                          )}
                          {error && (
                            <span
                              id="error-pwd-message"
                              className="text-danger"
                            >
                              {error.response?.data.errorMessage}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={rememberMe}
                                onClick={() => setRememberMe(!rememberMe)}
                                id="flexCheckDefault"
                              />
                              <label className="form-check-label">
                                Lưu đăng nhập
                              </label>
                            </div>
                          </div>
                          <p className="forgot-pass mb-0">
                            <a
                              href="forgotpassword"
                              className="text-dark fw-bold"
                            >
                              Bạn quên mật khẩu ?
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <button className={`btn btn-primary`}>
                            Đăng nhập
                          </button>
                          {/* <button className={`btn btn-primary ${errors.password || errors.username ? 'disabled' : ''}`}>Sign in</button> */}
                        </div>
                      </div>

                      <div className="col-lg-12 mt-4 text-center">
                        <h6>Hoặc đăng nhập bằng</h6>
                        <div className="row">
                          <div className="col-6 mt-3">
                            <div className="d-grid">
                              <a href=" " className="btn btn-light">
                                <i className="mdi mdi-facebook text-primary"></i>{" "}
                                Facebook
                              </a>
                            </div>
                          </div>

                          <div className="col-6 mt-3">
                            <div className="d-grid">
                              <a href=" " className="btn btn-light">
                                {/* <i className="mdi mdi-google text-danger"></i> <div className="g-signin2" data-onsuccess={onSignIn}></div> */}
                                <i className="mdi mdi-google text-danger"></i>{" "}
                                <div className="g-signin2"></div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Bạn chưa có tài khoản?
                          </small>{" "}
                          <a href="signup" className="text-dark fw-bold">
                            Tạo tài khoản
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

Login.Layout = EmptyLayout;
