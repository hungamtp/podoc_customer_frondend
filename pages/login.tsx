/* eslint-disable @next/next/no-img-element */
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { EmptyLayout } from "@/components/layouts";
import UseCart from "@/hooks/api/cart/use-cart";
import useLogin from "@/hooks/api/use-login";
import { login as loginAction } from "@/redux/slices/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

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
    .trim("Email không được để trống")
    .email("Email đúng định dạng")
    .min(8, "Email cần ít nhất 8 kí tự")
    .max(50, "Email tối đa 50 kí tự")
    .required("Email không được để trống"),
  password: yup
    .string()
    .trim()
    .min(8, "Mật khẩu cần ít nhất 8 chữ cái")
    .max(20, "Mật khẩu tối đa 20 chữ cái")
    .required("Mật khẩu không được để trống"),
});
export default function Login({ data }: Props) {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [seePassword, setSeePassword] = React.useState("password");
  const handleSeePassword = () => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  };
  const { mutate: login, isLoading } = useLogin();
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
  const { mutate: responseCart, isLoading: isCartLoading } = UseCart();
  const [errorLogin, setErrorLogin] = useState<string>("");
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    data.email = data.email.trimStart().trimEnd();
    const res = login(
      { email: data.email, password: data.password },
      {
        onSuccess: (data) => {
          const storage = globalThis?.sessionStorage;
          // Set the previous path as the value of the current path.
          const prevPath = storage.getItem("prevPath");
          dispatch(loginAction(data));
          responseCart("");
          enqueueSnackbar("Đăng nhập thành công!", {
            autoHideDuration: 3000,
            variant: "success",
          });
          if (
            prevPath === "/signup" ||
            prevPath === "/login" ||
            prevPath === "/forgotpassword"
          )
            router.push("/home");
          else router.back();
        },
        onError: (error: any) => {
          // if (error.response) setErrorLogin(error.response?.data.errorMessage);
          const errorMessage = error.response.data.errorMessage;
          if (errorMessage.includes("password is incorrect"))
            setErrorLogin("Thông tin đăng nhập không chính xác");
          else if (
            errorMessage.includes("user is not available at this time")
          ) {
            setErrorLogin("Tài khoản không thể truy cập vào lúc này");
          }
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
                  src="asset/images/user/login-picture.png"
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
                    onChange={() => {
                      setErrorLogin("");
                    }}
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
                              className="bi bi-envelope position-absolute mt-2 ms-3"
                            ></i>
                            <input
                              type="text"
                              className="form-control ps-5"
                              placeholder="Email"
                              {...register("email")}
                            />
                          </div>
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

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <>
                            <label className="form-label">
                              Mật khẩu <span className="text-danger">*</span>
                            </label>
                            <div className="position-relative ">
                              <i className="bi bi-key position-absolute mt-2 ms-3"></i>
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
                            </div>
                            {errors.password && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errors.password.message}
                              </span>
                            )}
                            {errorLogin && (
                              <span
                                id="error-pwd-message"
                                className="text-danger"
                              >
                                {errorLogin}
                              </span>
                            )}
                          </>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <p className="forgot-pass mt-2">
                            <Link href="forgotpassword">
                              <a className="text-dark fw-bold">
                                Bạn quên mật khẩu ?
                              </a>
                            </Link>
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

                      <div className="col-12 text-center">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Bạn chưa có tài khoản?
                          </small>{" "}
                          <Link href="signup">
                            <a className="text-dark fw-bold">Tạo tài khoản</a>
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

Login.Layout = EmptyLayout;
