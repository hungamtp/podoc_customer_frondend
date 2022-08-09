import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { LayoutProps } from "@/models/index";
import Link from "next/link";
import * as React from "react";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import UpdateImageSuccess from "@/components/account/update-image-success";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { storage } from "@/firebase/firebase";
import useGetAccountById from "@/hooks/api/account/use-account-by-id";
import useUpdateImageAccount from "@/hooks/api/account/use-update-image";
import { logout, updateImage } from "@/redux/slices/auth";
import { setCart } from "@/redux/slices/cart";
import { Filter } from "@/services/order";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Badge from "@mui/material/Badge";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { FALSE } from "sass";
export interface IAccountProps {}

export function Account({ children }: LayoutProps) {
  const storaged = globalThis?.sessionStorage;
  const prevPath = storaged.getItem("prevPath");
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(credentialId);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [images, setImages] = React.useState<ImageListType>([
    { data_url: responseAccount?.data.image },
  ]);
  const [isUpdatingImage, setIsUpdatingImage] = React.useState(false);

  const router = useRouter();
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (responseAccount) {
      setImages([{ data_url: responseAccount.data.image }]);
    }
  }, [responseAccount]);

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

  const onUploadImage = () => {
    if (images !== null) {
      setIsUpdatingImage(true);
      const file = images[0].file;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const submitData = {
            id: credentialId,
            image: url,
          };
          updateAvatarImage(submitData, {
            onSuccess: () => {
              queryClient.invalidateQueries("GetAccountById");
              setIsUpdatingImage(false);
              dispatch(updateImage(url));
            },
          });
          setIsImageChange(false);
        });
      });
    }
  };

  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    setIsImageChange(true);
    // data for submit
  };

  return (
    <div>
      <Header />
      <section className="section d-flex justify-content-center">
        <div className="w-80p">
          <div className="row align-items-end">
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                {images && (
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <Badge
                          className="avatar rounded-circle"
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <IconButton
                              color="primary"
                              style={{
                                backgroundColor: "gray",
                                opacity: 0.95,
                              }}
                              aria-label="upload picture"
                              component="label"
                              size="small"
                              onClick={onImageUpload}
                            >
                              <PhotoCamera fontSize="small" />
                            </IconButton>
                          }
                        >
                          {imageList.map((image, index) => (
                            <img
                              key={index}
                              src={
                                image["data_url"] != null
                                  ? image["data_url"]
                                  : ""
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                  "/asset/images/avatardefault_92824.png";
                              }}
                              className="avatar avatar rounded-circle"
                              width={120}
                              height={120}
                            />
                          ))}
                        </Badge>
                        {/* <button
                                  onClick={() => onUploadImage("")}
                                  className="btn btn-primary me-2  ms-2 mt-5"
                                >
                                  Lưu
                                </button> */}
                      </div>
                    )}
                  </ImageUploading>
                )}

                <div className="ms-3">
                  <h6 className="text-muted mb-0">Chào bạn,</h6>
                  <h5 className="mb-0">
                    {responseAccount?.data.userLastName}{" "}
                    {responseAccount?.data.userFirstName}
                  </h5>
                  {isImageChange && (
                    <button
                      onClick={onUploadImage}
                      className="btn btn-primary mt-2 pt-1 pb-1"
                    >
                      Lưu
                      {isUpdatingImage && (
                        <span
                          className="spinner-border spinner-border-sm ms-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                    </button>
                  )}
                  {isSuccess && <UpdateImageSuccess />}
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-md-9 mt-4 mt-sm-0 pt-2 pt-sm-0"></div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-md-3 mt-4 pt-2">
              <ul className="nav nav-pills nav-justified flex-column bg-white rounded shadow p-3 mb-0">
                <li className="nav-item">
                  <Link
                    id="dashboard"
                    data-bs-toggle="pill"
                    href="/account"
                    aria-controls="dash"
                    aria-selected="false"
                  >
                    <a
                      className={`nav-link rounded text-start py-1 px-3 ${
                        router.asPath === "/account" && "active show"
                      }`}
                    >
                      <h6 className="mb-0 d-flex py-1">
                        <i className="uil uil-dashboard h5 me-2 mb-0" />{" "}
                        <p className="m-0">Dashboard</p>
                      </h6>
                    </a>
                  </Link>
                  {/*end nav link*/}
                </li>
                <li className="nav-item mt-2">
                  <Link
                    id="mydesigns-list"
                    data-bs-toggle="pill"
                    href="/account/mydesign"
                    role="tab"
                    aria-controls="mydesigns"
                    aria-selected="false"
                  >
                    <a
                      className={`nav-link rounded text-start p-0 px-3 ${
                        router.asPath === "/account/mydesign" && "active show"
                      }`}
                    >
                      <h6 className="mb-0 d-flex py-2">
                        <svg
                          className="me-2 mb-0 h5"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width={20}
                          height={24}
                          viewBox="0 0 295.526 295.526"
                          xmlSpace="preserve"
                        >
                          <g>
                            <path
                              d="M147.763,44.074c12.801,0,23.858-8.162,27.83-20.169c-7.578,2.086-17.237,3.345-27.83,3.345
		                            c-10.592,0-20.251-1.259-27.828-3.345C123.905,35.911,134.961,44.074,147.763,44.074z"
                            />
                            <path
                              d="M295.158,58.839c-0.608-1.706-1.873-3.109-3.521-3.873l-56.343-26.01c-11.985-4.06-24.195-7.267-36.524-9.611
		                            c-0.434-0.085-0.866-0.126-1.292-0.126c-3.052,0-5.785,2.107-6.465,5.197c-4.502,19.82-22.047,34.659-43.251,34.659
		                            c-21.203,0-38.749-14.838-43.25-34.659c-0.688-3.09-3.416-5.197-6.466-5.197c-0.426,0-0.858,0.041-1.292,0.126
		                            c-12.328,2.344-24.538,5.551-36.542,9.611L3.889,54.965c-1.658,0.764-2.932,2.167-3.511,3.873
		                            c-0.599,1.726-0.491,3.589,0.353,5.217l24.46,48.272c1.145,2.291,3.474,3.666,5.938,3.666c0.636,0,1.281-0.092,1.917-0.283
		                            l27.167-8.052v161.97c0,3.678,3.001,6.678,6.689,6.678h161.723c3.678,0,6.67-3.001,6.67-6.678V107.66l27.186,8.052
		                            c0.636,0.191,1.28,0.283,1.915,0.283c2.459,0,4.779-1.375,5.94-3.666l24.469-48.272C295.629,62.428,295.747,60.565,295.158,58.839z
		                          "
                            />
                          </g>
                        </svg>{" "}
                        <p className="m-0">Thiết kế của tôi</p>
                      </h6>
                    </a>
                  </Link>
                  {/*end nav link*/}
                </li>
                {/*end nav item*/}

                <li className="nav-item mt-2">
                  <Link
                    id="order-history"
                    data-bs-toggle="pill"
                    href="/account/myorders"
                    role="tab"
                    aria-controls="orders"
                    aria-selected="false"
                  >
                    <a
                      className={`nav-link rounded text-start px-3 ${
                        router.asPath === "/account/myorders" && "active show"
                      }`}
                    >
                      <h6 className="mb-0 d-flex py-1">
                        <i className="uil uil-list-ul h5 me-2 mb-0" />{" "}
                        <p className="m-0">Đơn hàng chưa thanh toán</p>
                      </h6>
                    </a>
                  </Link>
                  {/*end nav link*/}
                </li>

                <li className="nav-item mt-2">
                  <Link
                    id="order-history"
                    data-bs-toggle="pill"
                    href="/account/all-order-detail"
                    role="tab"
                    aria-controls="orders"
                    aria-selected="false"
                  >
                    <a
                      className={`nav-link rounded text-start px-3 ${
                        router.asPath === "/account/all-order-detail" &&
                        "active show"
                      }`}
                    >
                      <h6 className="mb-0 d-flex py-1">
                        <i className="uil uil-clipboard-notes h5 me-2 mb-0" />{" "}
                        <p className="m-0">Đơn hàng đã mua</p>
                      </h6>
                    </a>
                  </Link>
                  {/*end nav link*/}
                </li>
                {/*end nav item*/}

                {/*end nav item*/}

                {/*end nav item*/}
                <li className="nav-item mt-2">
                  <Link
                    id="account-details"
                    data-bs-toggle="pill"
                    href="/account/account-setting"
                    role="tab"
                    aria-controls="account"
                    aria-selected="false"
                  >
                    <a
                      className={`nav-link rounded text-start py-1 px-3 ${
                        router.asPath === "/account/account-setting" &&
                        "active show"
                      }`}
                    >
                      <h6 className="mb-0 d-flex py-1">
                        <i className="uil uil-user h5 me-2 mb-0" />{" "}
                        <p className="m-0">Thông tin cá nhân</p>
                      </h6>
                    </a>
                  </Link>
                  {/*end nav link*/}
                </li>
                {/*end nav item*/}
                <li className="nav-item mt-2">
                  <Link href="/home">
                    <a
                      className="nav-link rounded"
                      role="tab"
                      onClick={logoutFunc}
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0 py-1">
                          <i className="uil uil-sign-out-alt h5 me-2 mb-0" />{" "}
                          Đăng xuất
                        </h6>
                      </div>
                    </a>
                  </Link>
                  {/*end nav link*/}
                </li>
                {/*end nav item*/}
              </ul>
              {/*end nav pills*/}
            </div>
            {/*end col*/}
            <div className="col-md-9 col-12 mt-4 pt-2">
              <div className=" bg-white shadow rounded p-4">{children}</div>
              {/*end teb pane*/}
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      <Footer />
    </div>
  );
}
