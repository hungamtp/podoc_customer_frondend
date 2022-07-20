/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ChangePassword from "@/components/account/change-password-form";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import useGetAccountById from "@/hooks/api/account/use-account-by-id";
import useUpdateProfile from "@/hooks/api/account/use-update-profile";
import UseCart from "@/hooks/api/cart/use-cart";
import { AccountByIdDtos } from "@/services/account/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { setCart } from "@/redux/slices/cart";
import { logout } from "@/redux/slices/auth";
import { useRouter } from "next/router";
import MyOrders from "./myorders";
import useMyOrders from "@/hooks/api/order/use-my-orders";
import { Filter } from "@/services/order";
import AllOrderDetail from "./all-order-detail";
import useAllOrderDetail from "@/hooks/api/order/use-all-order-detail";
import useVerifyEmail from "@/hooks/api/account/use-verify-email";
import MyDesign from "./mydesign";
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
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(credentialId);
  const { mutate: verifyEmail } = useVerifyEmail();
  const [isEdit, setIsEdit] = React.useState(false);
  const [isChangePassword, setIsChangePassword] = React.useState(false);
  const { mutate: updateProfile } = useUpdateProfile();
  const dispatch = useAppDispatch();

  const { data: responseCart, isLoading: isCartLoading } = UseCart();
  const router = useRouter();
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });
  const [filterAllOrder, setFilterAllOrder] = React.useState<Filter>({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data: myOrdersResponse, isLoading: isLoading } = useMyOrders(filter);
  const { data: allOrdersResponse, isLoading: isLoadingAllOrders } =
    useAllOrderDetail(filterAllOrder);

  React.useEffect(() => {
    if (responseCart) dispatch(setCart(responseCart));
  }, [responseCart]);

  React.useEffect(() => {
    const storage = globalThis?.sessionStorage;
    const prev = storage.getItem("prevPath");
    console.log(prev, "prev");
    if (prev?.includes("/design")) {
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
      <div>
        <section className="section d-flex justify-content-center">
          <div className="w-80p">
            <div className="row align-items-end">
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <img
                    src={responseAccount?.data.image}
                    className="avatar avatar rounded-circle"
                    width={120}
                    height={120}
                  />
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">Chào bạn,</h6>
                    <h5 className="mb-0">
                      {responseAccount?.data.userLastName}{" "}
                      {responseAccount?.data.userFirstName}
                    </h5>
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
                <ul
                  className="nav nav-pills nav-justified flex-column bg-white rounded shadow p-3 mb-0"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link rounded active"
                      id="dashboard"
                      data-bs-toggle="pill"
                      href="#dash"
                      role="tab"
                      aria-controls="dash"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-dashboard h5 align-middle me-2 mb-0" />{" "}
                          Dashboard
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      id="mydesigns-list"
                      data-bs-toggle="pill"
                      href="#mydesigns"
                      role="tab"
                      aria-controls="mydesigns"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <svg
                            className="me-2"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="2px"
                            width={20}
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
                          Thiết kế của tôi
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}

                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      id="order-history"
                      data-bs-toggle="pill"
                      href="#orders"
                      role="tab"
                      aria-controls="orders"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-list-ul h5 align-middle me-2 mb-0" />{" "}
                          Orders
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      id="order-history"
                      data-bs-toggle="pill"
                      href="#down"
                      role="tab"
                      aria-controls="orders"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-clipboard-notes h5 align-middle me-2 mb-0"></i>{" "}
                          Lịch sử mua hàng
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}

                  {/*end nav item*/}

                  {/*end nav item*/}
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      id="account-details"
                      data-bs-toggle="pill"
                      href="#account"
                      role="tab"
                      aria-controls="account"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-user h5 align-middle me-2 mb-0" />{" "}
                          Thông tin cá nhân
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      role="tab"
                      href="\"
                      onClick={logoutFunc}
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-sign-out-alt h5 align-middle me-2 mb-0" />{" "}
                          Đăng xuất
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}
                </ul>
                {/*end nav pills*/}
              </div>
              {/*end col*/}
              <div className="col-md-9 col-12 mt-4 pt-2">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade bg-white show active shadow rounded p-4"
                    id="dash"
                    role="tabpanel"
                    aria-labelledby="dashboard"
                  >
                    <h6 className="text-muted">
                      Hello <span className="text-dark">cally_joseph</span> (not{" "}
                      <span className="text-dark">cally_joseph</span>?{" "}
                      <a href="" className="text-danger">
                        Log out
                      </a>
                      )
                    </h6>
                    <h6 className="text-muted mb-0">
                      From your account dashboard you can view your{" "}
                      <a href="" className="text-danger">
                        recent orders
                      </a>
                      , manage your{" "}
                      <a href="" className="text-danger">
                        shipping and billing addresses
                      </a>
                      , and{" "}
                      <a href="" className="text-danger">
                        edit your password and account details
                      </a>
                      .
                    </h6>
                  </div>
                  {/*end teb pane*/}
                  <div
                    className="tab-pane fade bg-white shadow rounded p-4"
                    id="mydesigns"
                    role="tabpanel"
                    aria-labelledby="order-history"
                  >
                    <MyDesign />
                  </div>
                  {/*end teb pane*/}
                  <div
                    className="tab-pane fade bg-white shadow rounded p-4"
                    id="orders"
                    role="tabpanel"
                    aria-labelledby="order-history"
                  >
                    {myOrdersResponse && (
                      <MyOrders
                        myOrdersResponse={myOrdersResponse}
                        isLoading={isLoading}
                      />
                    )}
                  </div>
                  {/*end teb pane*/}
                  <div
                    className="tab-pane fade bg-white shadow rounded p-4"
                    id="down"
                    role="tabpanel"
                    aria-labelledby="download"
                  >
                    {allOrdersResponse && (
                      <AllOrderDetail
                        allOrdersResponse={allOrdersResponse}
                        isLoading={isLoadingAllOrders}
                      />
                    )}
                  </div>
                  {/*end teb pane*/}

                  {/*end teb pane*/}
                  <div
                    className="tab-pane fade bg-white shadow rounded p-4"
                    id="account"
                    role="tabpanel"
                    aria-labelledby="account-details"
                  >
                    {!isLoadingAccount && responseAccount && (
                      <form>
                        <div className="row">
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
                                  defaultValue={
                                    responseAccount.data.userLastName
                                  }
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
                                  defaultValue={
                                    responseAccount.data.userFirstName
                                  }
                                  {...register("userFirstName")}
                                />
                              </div>
                            </div>
                          </div>
                          {/*end col*/}
                          <label className="form-label ms-1 ">Email</label>
                          <div className="col-md-5">
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
                                {responseAccount.data.mailVerified ===
                                  false && (
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
                                <div className="form-icon position-relative">
                                  <button
                                    onClick={() => verifyEmail()}
                                    className=" btn btn-primary "
                                    type="button"
                                  >
                                    Xác nhận email
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <label className="form-label ms-1 ">Mật khẩu</label>
                          <div className="col-md-5">
                            <div className="mb-3">
                              <div className="form-icon position-relative">
                                <i className="bi bi-envelope-fill position-absolute mt-2 ms-3" />
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
                              <div className="form-icon position-relative">
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
                          <div className="col-md-8">
                            <div className="mb-3">
                              <label className="form-label">
                                Số điện thoại
                              </label>
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
                          <div className="col-lg-12 mt-2 mb-0">
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
                                className="btn btn-secondary"
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
                  </div>
                  {/*end teb pane*/}
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
        {/* End */}
      </div>
    </>
  );
}
AccountSetting.Layout = MainLayout;
