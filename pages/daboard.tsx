import { MainLayout } from "@/components/layouts";
import * as React from "react";

export interface IDaboardProps {}

export default function Daboard(props: IDaboardProps) {
  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <title>Landrick - Sidebar Light Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Premium Bootstrap 5 Admin Dashboard Template"
        />
        <meta
          name="keywords"
          content="Saas, CRM, Admin, Dashboard, Modern, Classic"
        />
        <meta name="author" content="Shreethemes" />
        <meta name="email" content="support@shreethemes.in" />
        <meta name="website" content="https://shreethemes.in" />
        <meta name="Version" content="v3.8.0" />
        {/* favicon */}
        <link rel="shortcut icon" href="assets/images/favicon.ico" />
        {/* Bootstrap */}
        <link
          href="assets/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* simplebar */}
        <link
          href="assets/css/simplebar.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* Icons */}
        <link
          href="assets/css/materialdesignicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="assets/css/tabler-icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://unicons.iconscout.com/release/v3.0.6/css/line.css"
          rel="stylesheet"
        />
        {/* Css */}
        <link
          href="assets/css/style.css"
          rel="stylesheet"
          type="text/css"
          id="theme-opt"
        />
        {/* Loader */}
        {/* <div id="preloader">
      <div id="status">
          <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
          </div>
      </div>
  </div> */}
        {/* Loader */}
        <div className="page-wrapper landrick-theme toggled">
          {/* sidebar-wrapper  */}
          {/* Start Page Content */}
          <main className="page-content bg-light">
            <div className="top-header">
              <div className="header-bar d-flex justify-content-between border-bottom">
                <div className="d-flex align-items-center">
                  <a href="#" className="logo-icon me-3">
                    <img
                      src="assets/images/logo-icon.png"
                      height={30}
                      className="small"
                      alt=""
                    />
                    <span className="big">
                      <img
                        src="assets/images/logo-dark.png"
                        height={24}
                        className="logo-light-mode"
                        alt=""
                      />
                      <img
                        src="assets/images/logo-light.png"
                        height={24}
                        className="logo-dark-mode"
                        alt=""
                      />
                    </span>
                  </a>
                  <a
                    id="close-sidebar"
                    className="btn btn-icon btn-soft-light"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-menu-2" />
                  </a>
                  <div className="search-bar p-0 d-none d-md-block ms-2">
                    <div id="search" className="menu-search mb-0">
                      <form
                        role="search"
                        method="get"
                        id="searchform"
                        className="searchform"
                      >
                        <div>
                          <input
                            type="text"
                            className="form-control border rounded"
                            name="s"
                            id="s"
                            placeholder="Search Keywords..."
                          />
                          <input
                            type="submit"
                            id="searchsubmit"
                            defaultValue="Search"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="list-inline-item mb-0">
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      <div className="btn btn-icon btn-soft-light">
                        <i className="ti ti-settings" />
                      </div>
                    </a>
                  </li>
                  <li className="list-inline-item mb-0 ms-1">
                    <div className="dropdown dropdown-primary">
                      <button
                        type="button"
                        className="btn btn-icon btn-soft-light dropdown-toggle p-0"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="ti ti-bell" />
                      </button>
                      <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </span>
                      <div
                        className="dropdown-menu dd-menu bg-white shadow rounded border-0 mt-3 p-0"
                        data-simplebar
                        style={{ height: "320px", width: "290px" }}
                      >
                        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                          <h6 className="mb-0 text-dark">Notifications</h6>
                          <span className="badge bg-soft-danger rounded-pill">
                            3
                          </span>
                        </div>
                        <div className="p-3">
                          <a
                            href="#!"
                            className="dropdown-item features feature-primary key-feature p-0"
                          >
                            <div className="d-flex align-items-center">
                              <div className="icon text-center rounded-circle me-2">
                                <i className="ti ti-shopping-cart" />
                              </div>
                              <div className="flex-1">
                                <h6 className="mb-0 text-dark title">
                                  Order Complete
                                </h6>
                                <small className="text-muted">15 min ago</small>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#!"
                            className="dropdown-item features feature-primary key-feature p-0 mt-3"
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/client/04.jpg"
                                className="avatar avatar-md-sm rounded-circle border shadow me-2"
                                alt=""
                              />
                              <div className="flex-1">
                                <h6 className="mb-0 text-dark title">
                                  <span className="fw-bold">Message</span> from
                                  Luis
                                </h6>
                                <small className="text-muted">1 hour ago</small>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#!"
                            className="dropdown-item features feature-primary key-feature p-0 mt-3"
                          >
                            <div className="d-flex align-items-center">
                              <div className="icon text-center rounded-circle me-2">
                                <i className="ti ti-currency-dollar" />
                              </div>
                              <div className="flex-1">
                                <h6 className="mb-0 text-dark title">
                                  <span className="fw-bold">
                                    One Refund Request
                                  </span>
                                </h6>
                                <small className="text-muted">2 hour ago</small>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#!"
                            className="dropdown-item features feature-primary key-feature p-0 mt-3"
                          >
                            <div className="d-flex align-items-center">
                              <div className="icon text-center rounded-circle me-2">
                                <i className="ti ti-truck-delivery" />
                              </div>
                              <div className="flex-1">
                                <h6 className="mb-0 text-dark title">
                                  Deliverd your Order
                                </h6>
                                <small className="text-muted">Yesterday</small>
                              </div>
                            </div>
                          </a>
                          <a
                            href="#!"
                            className="dropdown-item features feature-primary key-feature p-0 mt-3"
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/client/15.jpg"
                                className="avatar avatar-md-sm rounded-circle border shadow me-2"
                                alt=""
                              />
                              <div className="flex-1">
                                <h6 className="mb-0 text-dark title">
                                  <span className="fw-bold">Cally</span> started
                                  following you
                                </h6>
                                <small className="text-muted">2 days ago</small>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-inline-item mb-0 ms-1">
                    <div className="dropdown dropdown-primary">
                      <button
                        type="button"
                        className="btn btn-soft-light dropdown-toggle p-0"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img
                          src="assets/images/client/05.jpg"
                          className="avatar avatar-ex-small rounded"
                          alt=""
                        />
                      </button>
                      <div
                        className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 py-3"
                        style={{ minWidth: "200px" }}
                      >
                        <a
                          className="dropdown-item d-flex align-items-center text-dark pb-3"
                          href="profile.html"
                        >
                          <img
                            src="assets/images/client/05.jpg"
                            className="avatar avatar-md-sm rounded-circle border shadow"
                            alt=""
                          />
                          <div className="flex-1 ms-2">
                            <span className="d-block">Cristina Julia</span>
                            <small className="text-muted">
                              UI / UX Designer
                            </small>
                          </div>
                        </a>
                        <a
                          className="dropdown-item text-dark"
                          href="index.html"
                        >
                          <span className="mb-0 d-inline-block me-1">
                            <i className="ti ti-home" />
                          </span>{" "}
                          Dashboard
                        </a>
                        <a
                          className="dropdown-item text-dark"
                          href="profile.html"
                        >
                          <span className="mb-0 d-inline-block me-1">
                            <i className="ti ti-settings" />
                          </span>{" "}
                          Profile
                        </a>
                        <a
                          className="dropdown-item text-dark"
                          href="email.html"
                        >
                          <span className="mb-0 d-inline-block me-1">
                            <i className="ti ti-mail" />
                          </span>{" "}
                          Email
                        </a>
                        <div className="dropdown-divider border-top" />
                        <a
                          className="dropdown-item text-dark"
                          href="lock-screen.html"
                        >
                          <span className="mb-0 d-inline-block me-1">
                            <i className="ti ti-lock" />
                          </span>{" "}
                          Lockscreen
                        </a>
                        <a
                          className="dropdown-item text-dark"
                          href="login.html"
                        >
                          <span className="mb-0 d-inline-block me-1">
                            <i className="ti ti-logout" />
                          </span>{" "}
                          Logout
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container-fluid">
              <div className="layout-specing">
                <div className="row row-cols-xl-5 row-cols-md-2 row-cols-1">
                  <div className="col mt-4">
                    <a
                      href="#!"
                      className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-pill">
                          <i className="uil uil-user-circle fs-4 mb-0" />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">Visitor</h6>
                          <p className="fs-5 text-dark fw-bold mb-0">
                            <span className="counter-value" data-target={4589}>
                              2100
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-danger">
                        <i className="uil uil-chart-down" /> 0.5%
                      </span>
                    </a>
                  </div>
                  {/*end col*/}
                  <div className="col mt-4">
                    <a
                      href="#!"
                      className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-pill">
                          <i className="uil uil-usd-circle fs-4 mb-0" />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">Revenue</h6>
                          <p className="fs-5 text-dark fw-bold mb-0">
                            $
                            <span className="counter-value" data-target={48575}>
                              35214
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-success">
                        <i className="uil uil-arrow-growth" /> 3.84%
                      </span>
                    </a>
                  </div>
                  {/*end col*/}
                  <div className="col mt-4">
                    <a
                      href="#!"
                      className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-pill">
                          <i className="uil uil-shopping-bag fs-4 mb-0" />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">Orders</h6>
                          <p className="fs-5 text-dark fw-bold mb-0">
                            <span className="counter-value" data-target={4800}>
                              3402
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-success">
                        <i className="uil uil-arrow-growth" /> 1.46%
                      </span>
                    </a>
                  </div>
                  {/*end col*/}
                  <div className="col mt-4">
                    <a
                      href="#!"
                      className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-pill">
                          <i className="uil uil-store fs-4 mb-0" />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">Items</h6>
                          <p className="fs-5 text-dark fw-bold mb-0">
                            <span className="counter-value" data-target={145}>
                              23
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-muted">
                        <i className="uil uil-analysis" /> 0.0%
                      </span>
                    </a>
                  </div>
                  {/*end col*/}
                  <div className="col mt-4">
                    <a
                      href="#!"
                      className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-pill">
                          <i className="uil uil-users-alt fs-4 mb-0" />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">Users</h6>
                          <p className="fs-5 text-dark fw-bold mb-0">
                            <span className="counter-value" data-target={9}>
                              1.5
                            </span>
                            M
                          </p>
                        </div>
                      </div>
                      <span className="text-danger">
                        <i className="uil uil-chart-down" /> 0.5%
                      </span>
                    </a>
                  </div>
                  {/*end col*/}
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* page-wrapper */}
        {/* Offcanvas Start */}
        <div
          className="offcanvas offcanvas-end bg-white shadow"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 id="offcanvasRightLabel" className="mb-0">
              <img
                src="assets/images/logo-dark.png"
                height={24}
                className="light-version"
                alt=""
              />
              <img
                src="assets/images/logo-light.png"
                height={24}
                className="dark-version"
                alt=""
              />
            </h5>
            <button
              type="button"
              className="btn-close d-flex align-items-center text-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="mdi mdi-close fs-4" />
            </button>
          </div>
          <div className="offcanvas-body p-4 px-md-5">
            <div className="row">
              <div className="col-12">
                {/* Style switcher */}

                {/* end Style switcher */}
              </div>
              {/*end col*/}
            </div>
          </div>
        </div>
        {/* Offcanvas End */}
        {/* javascript */}
        {/* simplebar */}
        {/* Icons */}
        {/* Chart */}
        {/* Main Js */}
      </div>
    </>
  );
}

Daboard.Layout = MainLayout;
