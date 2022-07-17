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
  const [isEdit, setIsEdit] = React.useState(true);
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

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
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
                          <i className="uil uil-clipboard-notes align-middle me-1"></i>{" "}
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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Họ</label>
                              <div className="form-icon position-relative">
                                <i className="bi bi-person-fill position-absolute mt-2 ms-3" />
                                <input
                                  id="first-name"
                                  type="text"
                                  className="form-control ps-5"
                                  disabled={isEdit}
                                  defaultValue={
                                    responseAccount.data.userLastName
                                  }
                                  {...register("userLastName")}
                                />
                              </div>
                            </div>
                          </div>
                          {/*end col*/}
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Tên</label>
                              <div className="form-icon position-relative">
                                <i className="bi bi-person-check-fill position-absolute mt-2 ms-3" />
                                <input
                                  id="last-name"
                                  type="text"
                                  className="form-control ps-5"
                                  disabled={isEdit}
                                  defaultValue={
                                    responseAccount.data.userFirstName
                                  }
                                  {...register("userFirstName")}
                                />
                              </div>
                            </div>
                          </div>
                          {/*end col*/}
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Email</label>
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
                              </div>
                            </div>
                          </div>
                          {/*end col*/}

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Số điện thoại
                              </label>
                              <div className="form-icon position-relative">
                                <i className="bi bi-telephone-fill position-absolute mt-2 ms-3" />
                                <input
                                  id="display-name"
                                  type="text"
                                  disabled={isEdit}
                                  className="form-control ps-5"
                                  defaultValue={responseAccount.data.phone}
                                  {...register("phone")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Địa chỉ</label>
                              <div className="form-icon position-relative">
                                <i className="bi bi-house-fill position-absolute mt-2 ms-3" />
                                <textarea
                                  id="display-name"
                                  rows={3}
                                  disabled={isEdit}
                                  className="form-control ps-5"
                                  defaultValue={responseAccount.data.address}
                                  {...register("address")}
                                />
                              </div>
                            </div>
                          </div>
                          {/*end col*/}
                          <div className="col-lg-12 mt-2 mb-0">
                            <button
                              className="btn btn-primary me-2"
                              type="submit"
                            >
                              Lưu thay đổi
                            </button>
                            <button
                              onClick={handleIsEdit}
                              className="btn btn-secondary"
                              type="button"
                            >
                              Edit
                            </button>
                          </div>

                          {/*end col*/}
                        </div>
                        {/*end row*/}
                      </form>
                    )}
                    <h5 className="mt-4">Đổi mật khẩu:</h5>
                    <ChangePassword id={credentialId} />
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
