/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ChangePassword from "@/components/account/change-password-form";
import VerifieSuccess from "@/components/account/verifie-success-form";
import Dashboard from "@/pages/account";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { Account, MainLayout } from "@/components/layouts";
import useGetAccountById from "@/hooks/api/account/use-account-by-id";
import useUpdateProfile from "@/hooks/api/account/use-update-profile";
import useVerifyEmail from "@/hooks/api/account/use-verify-email";
import UseCart from "@/hooks/api/cart/use-cart";
import useAllOrderDetail from "@/hooks/api/order/use-all-order-detail";
import useMyOrders from "@/hooks/api/order/use-my-orders";
import { logout } from "@/redux/slices/auth";
import { setCart } from "@/redux/slices/cart";
import { AccountByIdDtos } from "@/services/account/dto";
import { Filter } from "@/services/order";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Badge from "@mui/material/Badge";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { storage } from "@/firebase/firebase";
import ImageUploading, { ImageListType } from "react-images-uploading";
import * as yup from "yup";
import AllOrderDetail from "./all-order-detail";
import MyDesign from "./mydesign";
import MyOrders from "./myorders";
import useUpdateImageAccount from "@/hooks/api/account/use-update-image";
import { updateImageAccount } from "@/services/account";
import UpdateImageSuccess from "@/components/account/update-image-success";

export interface IAccountSettingProps {}

const schema = yup.object().shape({
  userFirstName: yup
    .string()
    .trim("Tên không được để trống")
    .min(1, "Tên cần ít nhất 1 kí tự")
    .max(26, "Tên tối đa 50 kí tự")
    .required("Tên không được để trống"),
  userLastName: yup
    .string()
    .trim("Họ không được để trống")
    .min(1, "Họ cần ít nhất 1 kí tự")
    .max(26, "Họ tối đa 50 kí tự")
    .required("Họ không được để trống"),
  email: yup
    .string()
    .trim("Email không được để trống")
    .email()
    .min(8, "Tài khoản cần ít nhất 8 kí tự")
    .max(50, "Tài khoản tối đa 50 kí tự")
    .required("Tài khoản không được để trống"),
  phone: yup
    .string()
    .trim("Số điện thoại không được để trống")
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  address: yup
    .string()
    .trim("Địa chỉ được để trống")
    .min(10, "Địa chỉ cần ít nhất 10 kí tự")
    .max(300, "Địa chỉ tối đa 300 kí tự")
    .required("Địa chỉ không được để trống"),
});

export default function AccountSetting(props: IAccountSettingProps) {
  const storaged = globalThis?.sessionStorage;
  const prevPath = storaged.getItem("prevPath");
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(credentialId);
  const {
    mutate: verifyEmail,
    isLoading: isLoadingVerifieEmail,
    isSuccess: isSuccessVerifieEmail,
  } = useVerifyEmail();
  const [isEdit, setIsEdit] = React.useState(false);
  const [isChangePassword, setIsChangePassword] = React.useState(false);
  const { mutate: updateProfile } = useUpdateProfile();
  const dispatch = useAppDispatch();
  const [images, setImages] = React.useState<ImageListType>([
    { data_url: responseAccount?.data.image },
  ]);

  const router = useRouter();

  const maxNumber = 69;

  const [isImageChange, setIsImageChange] = React.useState(false);

  const {
    mutate: updateAvatarImage,
    isSuccess,
    isLoading: isLoadingUpdateImage,
  } = useUpdateImageAccount();

  React.useEffect(() => {
    const storage = globalThis?.sessionStorage;
    const prev = storage.getItem("prevPath");
    if (prev === "/design") {
    }
  }, []);

  const logoutFunc = () => {
    dispatch(setCart([]));
    dispatch(logout([]));
    router.push("/");
  };

  const defaultValues: AccountByIdDtos = {
    id: "",
    userFirstName: "",
    userLastName: "",
    name: "",
    email: "",
    roleName: "",
    phone: 0,
    address: "",
    image: "",
    userStatus: "",
    mailVerified: false,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountByIdDtos>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(responseAccount?.data);
    setImages([{ data_url: responseAccount?.data.image }]);
  }, [responseAccount]);

  const onSubmit: SubmitHandler<AccountByIdDtos> = (data) => {
    const tmpData = {
      id: credentialId,
      firstName: data.userFirstName,
      lastName: data.userLastName,
      address: data.address,
      name: data.name,
      phone: data.phone.toString(),
      roleName: data.roleName,
      email: data.email,
    };
    updateProfile(tmpData);
    setIsEdit(false);
  };

  const closeChangePassword = () => {
    setIsChangePassword(false);
  };

  return (
    <>
      <>
        {!isLoadingAccount && responseAccount && (
          <form>
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Họ</label>
                  <div className="form-icon position-relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user-check fea icon-sm icons "
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <polyline points="17 11 19 13 23 9"></polyline>
                    </svg>
                    <input
                      id="first-name"
                      type="text"
                      className="form-control ps-5"
                      disabled={!isEdit}
                      defaultValue={responseAccount.data.userLastName}
                      {...register("userLastName")}
                    />
                  </div>
                  {errors.userLastName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.userLastName.message}
                    </span>
                  )}
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Tên</label>
                  <div className="form-icon position-relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user-check fea icon-sm icons "
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <polyline points="17 11 19 13 23 9"></polyline>
                    </svg>
                    <input
                      id="last-name"
                      type="text"
                      className="form-control ps-5"
                      disabled={!isEdit}
                      defaultValue={responseAccount.data.userFirstName}
                      {...register("userFirstName")}
                    />
                  </div>
                  {errors.userFirstName && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.userFirstName.message}
                    </span>
                  )}
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-8 row">
                <label className="form-label p-0">Email</label>
                <div className="col-md-5 p-0">
                  <div className="form-icon position-relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail fea icon-ex-md text-muted position-absolute mt-2 ms-3"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input
                      id="email"
                      type="email"
                      disabled
                      className="form-control ps-5"
                      defaultValue={responseAccount.data.email}
                      {...register("email")}
                    />
                    {responseAccount.data.mailVerified === false && (
                      <i className="bi bi-x-circle-fill text-warning ms-3 me-2 pe-2 position-absolute top-50 start-100 translate-middle"></i>
                    )}
                    {responseAccount.data.mailVerified === true && (
                      <i className="bi bi-check-circle-fill icon-success ms-3 me-2 pe-2 position-absolute top-50 start-100 translate-middle"></i>
                    )}
                  </div>
                  {responseAccount.data.mailVerified === false && (
                    <p className="ms-1 text-warning">
                      Email chưa được xác nhận
                    </p>
                  )}
                </div>
                {/*end col*/}
                {responseAccount.data.mailVerified === false && (
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="form-icon position-relative d-flex justify-content-end">
                        <button
                          onClick={() => verifyEmail()}
                          className=" btn btn-primary "
                          type="button"
                        >
                          {isLoadingVerifieEmail ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "Xác nhận email"
                          )}
                        </button>
                      </div>
                      {isSuccessVerifieEmail && <VerifieSuccess />}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-8 row">
                <label className="form-label ms-1 p-0">Mật khẩu</label>
                <div className="col-md-5 p-0">
                  <div className="mb-3">
                    <div className="form-icon position-relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-key fea icon-sm icons"
                      >
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                      </svg>
                      <input
                        id="password"
                        type="password"
                        disabled
                        className="form-control ps-5"
                        defaultValue="matkhaucuahientai"
                      />
                    </div>
                  </div>
                </div>
                {/*end col*/}

                <div className="col-md-4">
                  <div className="mb-3">
                    <div className="form-icon position-relative d-flex justify-content-end">
                      <button
                        onClick={() => {
                          setIsChangePassword(true);
                        }}
                        className=" btn btn-primary "
                        type="button"
                      >
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Số điện thoại</label>
                  <div className="form-icon position-relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-phone fea icon-sm mt-2 ms-3 position-absolute"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <input
                      id="display-phone"
                      type="text"
                      disabled={!isEdit}
                      className="form-control ps-5"
                      defaultValue={responseAccount.data.phone}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <div className="form-icon position-relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-map-pin fea icon-sm position-absolute mt-2 ms-3"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <textarea
                      id="display-address"
                      rows={3}
                      disabled={!isEdit}
                      className="form-control ps-5"
                      defaultValue={responseAccount.data.address}
                      {...register("address")}
                    />
                  </div>
                  {errors.address && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-8 mt-2 mb-0">
                {isEdit && (
                  <>
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="btn btn-primary me-2"
                      type="submit"
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit(false);
                        reset(responseAccount?.data);
                      }}
                      style={{ width: "140px" }}
                      className="btn btn-primary me-2"
                    >
                      Hủy
                    </button>
                  </>
                )}
                {!isEdit && (
                  <button
                    onClick={() => {
                      setIsEdit(true);
                    }}
                    className="btn btn-secondary "
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>

              {/*end col*/}
            </div>
            {/*end row*/}
          </form>
        )}
        {
          <div className="">
            {isChangePassword && (
              <>
                <hr />
                <ChangePassword
                  id={credentialId}
                  closeChangePassword={closeChangePassword}
                />
              </>
            )}
          </div>
        }
      </>
    </>
  );
}
AccountSetting.Layout = Account;
