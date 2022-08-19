/* eslint-disable @next/next/no-img-element */
import { EmptyLayout } from "@/components/layouts";
import useResetPassword from "@/hooks/api/account/use-reset-password";
import { ResetPasswordDto } from "@/services/account/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type Props = {};

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(30, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  passwordConfirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không đúng"),
});

export default function ResetPassword({}: Props) {
  const { mutate: resetPassword, isLoading: isLoading } = useResetPassword();
  const router = useRouter();
  const email = router.asPath.split("/")[3];
  const token = router.asPath.split("/")[4];
  const defaultValues: ResetPasswordDto = {
    email: "",
    token: "",
    newPassword: "",
    passwordConfirmation: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ResetPasswordDto> = (data) => {
    const tmpData = {
      email: email,
      token: token,
      newPassword: data.newPassword,
      passwordConfirmation: "",
    };
    resetPassword(tmpData);
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
                  src="/asset/images/user/recovery.svg"
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
                        <div className="mb-3">
                          <label className="form-label">
                            Mật khẩu <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="mail"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="password"
                              className="form-control ps-5"
                              placeholder="Mật khẩu mới"
                              {...register("newPassword")}
                            />
                            {errors.newPassword && (
                              <p className="text-danger">
                                {errors.newPassword.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Nhập lại mật khẩu{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i
                              data-feather="mail"
                              className="fea icon-sm icons"
                            ></i>
                            <input
                              type="password"
                              className="form-control ps-5"
                              placeholder="Nhập lại Mật khẩu mới"
                              {...register("passwordConfirmation")}
                            />
                            {errors.passwordConfirmation && (
                              <p className="text-danger">
                                {errors.passwordConfirmation.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Lưu
                          </button>
                        </div>
                      </div>
                      <div className="mx-auto">
                        <p className="mb-0 mt-3"></p>
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
ResetPassword.Layout = EmptyLayout;
