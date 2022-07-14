import useUpdatePassword from "@/hooks/api/account/use-update-password";
import { UpdatePasswordDto } from "@/services/account/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
export interface IChangePasswordProps {
  id: string;
}

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(30, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  newPassword: yup
    .string()
    .min(8, "Mật khẩu cần ít nhất 8 kí tự")
    .max(30, "Mật khẩu tối đa 50 kí tự")
    .required("Mật khẩu không được để trống"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không đúng"),
});

export default function ChangePassword(props: IChangePasswordProps) {
  const { id } = props;
  const { mutate: updatePassword } = useUpdatePassword(id);
  const defaultValues: UpdatePasswordDto = {
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  };

  const {
    register,
    handleSubmit,
    reset,
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
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Mật khẩu cũ:</label>
              <div className="form-icon position-relative">
                <i className="bi bi-key-fill position-absolute mt-2 ms-3" />

                <input
                  type="password"
                  className="form-control ps-5"
                  placeholder="Mật khẩu cũ"
                  {...register("oldPassword")}
                />
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
                  type="password"
                  className="form-control ps-5"
                  placeholder="Mật khẩu mới"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-danger">{errors.newPassword.message}</p>
                )}
              </div>
            </div>
          </div>
          {/*end col*/}
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Nhập lại mật khẩu mới:</label>
              <div className="form-icon position-relative">
                <i className="bi bi-key position-absolute mt-2 ms-3" />
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
          {/*end col*/}
          <div className="col-lg-12 mt-2 mb-0">
            <button className="btn btn-primary">Lưu mật khẩu</button>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </form>
    </>
  );
}
