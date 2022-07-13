import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import useGetAccountById from "@/hooks/api/account/use-account-by-id";
import * as React from "react";

export interface IAccountSettingProps {}

export default function AccountSetting(props: IAccountSettingProps) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  console.log(credentialId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(credentialId);

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
                    className="avatar avatar-md-md rounded-circle"
                    alt=""
                  />
                  <div className="ms-3">
                    <h6 className="text-muted mb-0">Chào bạn,</h6>
                    <h5 className="mb-0">{responseAccount?.data.name}</h5>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <p className="text-muted mb-0">
                  Launch your campaign and benefit from our expertise on
                  designing and managing conversion centered bootstrap v5 html
                  page.
                </p>
              </div>
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
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      id="download"
                      data-bs-toggle="pill"
                      href="#down"
                      role="tab"
                      aria-controls="down"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-arrow-circle-down h5 align-middle me-2 mb-0" />{" "}
                          Downloads
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link rounded"
                      id="addresses"
                      data-bs-toggle="pill"
                      href="#address"
                      role="tab"
                      aria-controls="address"
                      aria-selected="false"
                    >
                      <div className="text-start py-1 px-3">
                        <h6 className="mb-0">
                          <i className="uil uil-map-marker h5 align-middle me-2 mb-0" />{" "}
                          Addresses
                        </h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
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
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="user"
                                className="fea icon-sm icons"
                              />
                              <input
                                name="name"
                                id="first-name"
                                type="text"
                                className="form-control ps-5"
                                defaultValue="Cally"
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="user-check"
                                className="fea icon-sm icons"
                              />
                              <input
                                name="name"
                                id="last-name"
                                type="text"
                                className="form-control ps-5"
                                defaultValue="Joseph"
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Your Email</label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="mail"
                                className="fea icon-sm icons"
                              />
                              <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control ps-5"
                                defaultValue="callyjoseph@gmail.com"
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Display Name</label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="user-check"
                                className="fea icon-sm icons"
                              />
                              <input
                                name="name"
                                id="display-name"
                                type="text"
                                className="form-control ps-5"
                                defaultValue="cally_joseph"
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-12 mt-2 mb-0">
                          <button className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                    </form>
                    <h5 className="mt-4">Change password :</h5>
                    <form>
                      <div className="row mt-3">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Old password :</label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="key"
                                className="fea icon-sm icons"
                              />
                              <input
                                type="password"
                                className="form-control ps-5"
                                placeholder="Old password"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">New password :</label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="key"
                                className="fea icon-sm icons"
                              />
                              <input
                                type="password"
                                className="form-control ps-5"
                                placeholder="New password"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Re-type New password :
                            </label>
                            <div className="form-icon position-relative">
                              <i
                                data-feather="key"
                                className="fea icon-sm icons"
                              />
                              <input
                                type="password"
                                className="form-control ps-5"
                                placeholder="Re-type New password"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-12 mt-2 mb-0">
                          <button className="btn btn-primary">
                            Save Password
                          </button>
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                    </form>
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
