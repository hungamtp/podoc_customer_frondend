/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetStaticPaths, GetStaticProps } from "next";
import useLogin from "@/hooks/auth/use-login";
type FormLogin = {
  email: string;
  password: string;
};

type Props = {
  data: any;
};
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch('http:localhost:3001/login', {
//     method: 'POST',
//   });
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };
const schema = yup.object().shape({
  email: yup.string().email().min(8).max(50).required(),
  password: yup.string().min(8).max(26).required(),
});
export default function Login({ data }: Props) {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const { mutate: login, isLoading, error } = useLogin();
  const defaultValues: FormLogin = {
    email: "hieuthomnghiep@gmail.com",
    password: "123456789",
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
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    console.log(data, "loginn");
    const res = login({ username: data.email, password: data.password });
    console.log(res);
    if (rememberMe) {
    }
  };
  console.log(errors);
  // const onSignIn(googleUser : any) : void {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // };
  return (
    <>
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      </div>

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
                  <h4 className="card-title text-center">Login</h4>
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
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i className="fea icon-sm icons"></i>
                            <input
                              type="password"
                              className="form-control ps-5"
                              placeholder="Password"
                              {...register("password")}
                            />
                          </div>
                          {errors.password && (
                            <span id="error-pwd-message">
                              This field is required
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
                                Remember me
                              </label>
                            </div>
                          </div>
                          <p className="forgot-pass mb-0">
                            <a
                              href="forgotpassword"
                              className="text-dark fw-bold"
                            >
                              Forgot password ?
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <button className={`btn btn-primary`}>Sign in</button>
                          {/* <button className={`btn btn-primary ${errors.password || errors.username ? 'disabled' : ''}`}>Sign in</button> */}
                        </div>
                      </div>

                      <div className="col-lg-12 mt-4 text-center">
                        <h6>Or Login With</h6>
                        <div className="row">
                          <div className="col-6 mt-3">
                            <div className="d-grid">
                              <a
                                href="javascript:void(0)"
                                className="btn btn-light"
                              >
                                <i className="mdi mdi-facebook text-primary"></i>{" "}
                                Facebook
                              </a>
                            </div>
                          </div>

                          <div className="col-6 mt-3">
                            <div className="d-grid">
                              <a
                                href="javascript:void(0)"
                                className="btn btn-light"
                              >
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
                            Don&apos;t have an account ?
                          </small>{" "}
                          <a href="signup" className="text-dark fw-bold">
                            Sign Up
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
