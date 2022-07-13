/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ChangePassword from "@/components/account/change-password-form";
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import useGetAccountById from "@/hooks/api/account/use-account-by-id";
import useUpdateProfile from "@/hooks/api/account/use-update-profile";
import { AccountByIdDtos } from "@/services/account/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
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
        <section className="section">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-4">
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
              <div className="col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0"></div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="row">
              <div className="col-md-4 mt-4 pt-2">
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
                          Account Details
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
                      href="auth-login.html"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-sign-out-alt h5 align-middle me-2 mb-0" />{" "}
                          Logout
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
              <div className="col-md-8 col-12 mt-4 pt-2">
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
                      <a href="javascript:void(0)" className="text-danger">
                        Log out
                      </a>
                      )
                    </h6>
                    <h6 className="text-muted mb-0">
                      From your account dashboard you can view your{" "}
                      <a href="javascript:void(0)" className="text-danger">
                        recent orders
                      </a>
                      , manage your{" "}
                      <a href="javascript:void(0)" className="text-danger">
                        shipping and billing addresses
                      </a>
                      , and{" "}
                      <a href="javascript:void(0)" className="text-danger">
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
                    <div className="table-responsive bg-white shadow rounded">
                      <table className="table mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              Order no.
                            </th>
                            <th scope="col" className="border-bottom">
                              Date
                            </th>
                            <th scope="col" className="border-bottom">
                              Status
                            </th>
                            <th scope="col" className="border-bottom">
                              Total
                            </th>
                            <th scope="col" className="border-bottom">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">7107</th>
                            <td>1st November 2021</td>
                            <td className="text-success">Delivered</td>
                            <td>
                              $ 320{" "}
                              <span className="text-muted">for 2items</span>
                            </td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                className="text-primary"
                              >
                                View <i className="uil uil-arrow-right" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">8007</th>
                            <td>4th November 2021</td>
                            <td className="text-muted">Processing</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                className="text-primary"
                              >
                                View <i className="uil uil-arrow-right" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">8008</th>
                            <td>4th November 2021</td>
                            <td className="text-danger">Canceled</td>
                            <td>
                              $ 800{" "}
                              <span className="text-muted">for 1item</span>
                            </td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                className="text-primary"
                              >
                                View <i className="uil uil-arrow-right" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/*end teb pane*/}
                  <div
                    className="tab-pane fade bg-white shadow rounded p-4"
                    id="down"
                    role="tabpanel"
                    aria-labelledby="download"
                  >
                    <div className="table-responsive bg-white shadow rounded">
                      <table className="table mb-0 table-center table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="border-bottom">
                              Product Name
                            </th>
                            <th scope="col" className="border-bottom">
                              Description
                            </th>
                            <th scope="col" className="border-bottom">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Quick heal</th>
                            <td className="text-muted">
                              It is said that song composers of the past <br />{" "}
                              used dummy texts as lyrics when writing <br />{" "}
                              melodies in order to have a {"ready-made"} <br />{" "}
                              text to sing with the melody.
                            </td>
                            <td className="text-success">Downloaded</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/*end teb pane*/}
                  <div
                    className="tab-pane fade bg-white shadow rounded p-4"
                    id="address"
                    role="tabpanel"
                    aria-labelledby="addresses"
                  >
                    <h6 className="text-muted mb-0">
                      The following addresses will be used on the checkout page
                      by default.
                    </h6>
                    <div className="row">
                      <div className="col-lg-6 mt-4 pt-2">
                        <div className="d-flex align-items-center mb-4 justify-content-between">
                          <h5 className="mb-0">Billing Address:</h5>
                          <a
                            href="javascript:void(0)"
                            className="text-primary h5 mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-original-title="Edit"
                          >
                            <i className="uil uil-edit align-middle" />
                          </a>
                        </div>
                        <div className="pt-4 border-top">
                          <p className="h6">Cally Joseph</p>
                          <p className="h6 text-muted">
                            C/54 Northwest Freeway,{" "}
                          </p>
                          <p className="h6 text-muted">Suite 558,</p>
                          <p className="h6 text-muted">Houston, USA 485</p>
                          <p className="h6 text-muted mb-0">+123 897 5468</p>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-4 pt-2">
                        <div className="d-flex align-items-center mb-4 justify-content-between">
                          <h5 className="mb-0">Shipping Address:</h5>
                          <a
                            href="javascript:void(0)"
                            className="text-primary h5 mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-original-title="Edit"
                          >
                            <i className="uil uil-edit align-middle" />
                          </a>
                        </div>
                        <div className="pt-4 border-top">
                          <p className="h6">Cally Joseph</p>
                          <p className="h6 text-muted">
                            C/54 Northwest Freeway,{" "}
                          </p>
                          <p className="h6 text-muted">Suite 558,</p>
                          <p className="h6 text-muted">Houston, USA 485</p>
                          <p className="h6 text-muted mb-0">+123 897 5468</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                                <i
                                  data-feather="user"
                                  className="fea icon-sm icons"
                                />
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
                                <i
                                  data-feather="user-check"
                                  className="fea icon-sm icons"
                                />
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
                                <i
                                  data-feather="mail"
                                  className="fea icon-sm icons"
                                />
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
                                <i
                                  data-feather="user-check"
                                  className="fea icon-sm icons"
                                />
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
                                <i
                                  data-feather="user-check"
                                  className="fea icon-sm icons"
                                />
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
                    <ChangePassword />
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
