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
    .min(1, "First Name cần ít nhất 1 kí tự")
    .max(26, "First Name tối đa 50 kí tự")
    .required("First Name không được để trống"),
  userLastName: yup
    .string()
    .min(1, "Last Name cần ít nhất 1 kí tự")
    .max(26, "Last Name tối đa 50 kí tự")
    .required("Last Name không được để trống"),
  email: yup
    .string()
    .email()
    .min(8, "Tài khoản cần ít nhất 8 kí tự")
    .max(50, "Tài khoản tối đa 50 kí tự")
    .required("Tài khoản không được để trống"),
  phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Số điện thoại gồm 10 số và bắt đầu từ 0"
    )
    .required("Số điện thoại không được để trống"),
  address: yup
    .string()
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
    console.log(prev, "prev");
    if (prev === "/design") {
      console.log("aduuu");
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

  const onUploadImage = () => {
    if (images !== null) {
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = {
            id: credentialId,
            image: url,
          };
          updateAvatarImage(submitData);
          setIsImageChange(false);
        });
      });
    }
  };

  const closeChangePassword = () => {
    setIsChangePassword(false);
  };
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    setIsImageChange(true);
    // data for submit
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
                    <i className="bi bi-person-fill position-absolute mt-2 ms-3" />
                    <input
                      id="first-name"
                      type="text"
                      className="form-control ps-5"
                      disabled={!isEdit}
                      defaultValue={responseAccount.data.userLastName}
                      {...register("userLastName")}
                    />
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Tên</label>
                  <div className="form-icon position-relative">
                    <i className="bi bi-person-check-fill position-absolute mt-2 ms-3" />
                    <input
                      id="last-name"
                      type="text"
                      className="form-control ps-5"
                      disabled={!isEdit}
                      defaultValue={responseAccount.data.userFirstName}
                      {...register("userFirstName")}
                    />
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-8 row">
                <label className="form-label p-0">Email</label>
                <div className="col-md-5 p-0">
                  <div className="mb-3">
                    <div className="form-icon position-relative">
                      <i className="bi bi-envelope-fill position-absolute mt-2 ms-3" />
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
                      <i className="bi bi-lock-fill position-absolute mt-2 ms-3" />
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
                    <i className="bi bi-telephone-fill position-absolute mt-2 ms-3" />
                    <input
                      id="display-name"
                      type="text"
                      disabled={!isEdit}
                      className="form-control ps-5"
                      defaultValue={responseAccount.data.phone}
                      {...register("phone")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <div className="form-icon position-relative">
                    <i className="bi bi-house-fill position-absolute mt-2 ms-3" />
                    <textarea
                      id="display-name"
                      rows={3}
                      disabled={!isEdit}
                      className="form-control ps-5"
                      defaultValue={responseAccount.data.address}
                      {...register("address")}
                    />
                  </div>
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
