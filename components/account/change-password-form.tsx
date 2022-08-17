import useUpdatePassword from "@/hooks/api/account/use-update-password";
import { UpdatePasswordDto } from "@/services/account/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
export interface IChangePasswordProps {
  id: string;
  closeChangePassword: () => void;
}

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .trim("Không đúng định dạng")
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(30, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  newPassword: yup
    .string()
    .trim("Không đúng định dạng")
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(30, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  passwordConfirmation: yup
    .string()
    .trim("Không đúng định dạng")
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không đúng"),
});

export default function ChangePassword(props: IChangePasswordProps) {
  const { id, closeChangePassword } = props;
  const {
    mutate: updatePassword,
    error,
    isLoading,
  } = useUpdatePassword(id, closeChangePassword);
  const defaultValues: UpdatePasswordDto = {
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  };

  const [seePassword, setSeePassword] = React.useState("password");
  const handleSeePassword = () => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  };

  React.useEffect(() => {
    setFocus("oldPassword");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<UpdatePasswordDto> = (data) => {
    updatePassword(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="h5">Đổi mật khẩu:</p>
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Mật khẩu cũ:</label>
              <div className="form-icon position-relative">
                <i className="bi bi-key-fill position-absolute mt-2 ms-3" />

                <input
                  type={seePassword}
                  className="form-control ps-5"
                  placeholder="Mật khẩu cũ"
                  {...register("oldPassword")}
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
                {errors.oldPassword && (
                  <p className="text-danger">{errors.oldPassword.message}</p>
                )}
              </div>
            </div>
          </div>
          {/*end col*/}
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Mật khẩu mới:</label>
              <div className="form-icon position-relative">
                <i className="bi bi-key position-absolute mt-2 ms-3" />

                <input
                  type={seePassword}
                  className="form-control ps-5"
                  placeholder="Mật khẩu mới"
                  {...register("newPassword")}
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
                {errors.newPassword && (
                  <p className="text-danger">{errors.newPassword.message}</p>
                )}
              </div>
            </div>
          </div>
          {/*end col*/}
          <div className="col-lg-12 mb-3">
            <>
              <label className="form-label">Nhập lại mật khẩu mới:</label>
              <div className="form-icon position-relative">
                <i className="bi bi-key position-absolute mt-2 ms-3" />
                <input
                  type={seePassword}
                  className="form-control ps-5"
                  placeholder="Nhập lại Mật khẩu mới"
                  {...register("passwordConfirmation")}
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
                {errors.passwordConfirmation && (
                  <p className="text-danger">
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>
              {error && (
                <span id="error-pwd-message" className="text-danger">
                  Mật khẩu cũ không đúng
                </span>
              )}
            </>
          </div>
          {/*end col*/}
          <div className="d-flex justify-content-center">
            <div className="col-lg-6 mt-2 mb-0 d-flex justify-content-evenly">
              <button
                className="btn btn-success"
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Lưu mật khẩu
              </button>
              <button
                className="btn btn-secondary"
                style={{ width: "140px" }}
                onClick={closeChangePassword}
              >
                Hủy
              </button>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </form>
    </>
  );
}
