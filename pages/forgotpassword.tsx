/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from "@/components/layouts";
import useForgotPassword from "@/hooks/api/account/use-forgot-password";
import { ForgotPasswordDto } from "@/services/account/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type Props = {};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("không đúng định dạng Email")
    .min(8, "Tài khoản cần ít nhất 8 kí tự")
    .max(50, "Tài khoản tối đa 50 kí tự")
    .required("Tài khoản không được để trống"),
});

export default function ForgotPassword({}: Props) {
  const {
    mutate: forgotPassword,
    isLoading: isLoading,
    error,
  } = useForgotPassword();

  const defaultValues: ForgotPasswordDto = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordDto> = (data) => {
    forgotPassword(data);
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
      <section className="bg-home d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="me-lg-5">
                <img
                  src="asset/images/user/recovery.svg"
                  className="img-fluid d-block mx-auto"
                  alt="recovery"
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="card shadow rounded border-0">
                <div className="card-body">
                  <h4 className="card-title text-center">Đặt lại mật khẩu</h4>

                  <form className="login-form mt-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <p className="text-muted">
                          Hãy điền địa chỉ email của bạn. Bạn sẽ nhận được một
                          đường link để tạo mật khẩu mới thông qua email.
                        </p>
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
                              placeholder="Nhập email của bạn"
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
                        {error && (
                          <span id="error-pwd-message" className="text-danger">
                            Email không tồn tại
                          </span>
                        )}
                      </div>
                      <div className="col-lg-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                      <div className="mx-auto">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Bạn đã nhớ lại mật khẩu ?
                          </small>{" "}
                          <Link href="login">
                            <a className="text-dark fw-bold fs-7">Đăng nhập</a>
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
ForgotPassword.Layout = EmptyLayout;
