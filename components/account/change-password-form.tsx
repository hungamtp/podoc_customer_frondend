import * as React from "react";

export interface IChangePasswordProps {}

export default function ChangePassword(props: IChangePasswordProps) {
  return (
    <>
      <form>
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Mật khẩu cũ:</label>
              <div className="form-icon position-relative">
                <i data-feather="key" className="fea icon-sm icons" />
                <input
                  type="password"
                  className="form-control ps-5"
                  placeholder="Mật khẩu cũ"
                  required
                />
              </div>
            </div>
          </div>
          {/*end col*/}
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Mật khẩu mới:</label>
              <div className="form-icon position-relative">
                <i data-feather="key" className="fea icon-sm icons" />
                <input
                  type="password"
                  className="form-control ps-5"
                  placeholder="Mật khẩu mới"
                  required
                />
              </div>
            </div>
          </div>
          {/*end col*/}
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Nhập lại mật khẩu mới:</label>
              <div className="form-icon position-relative">
                <i data-feather="key" className="fea icon-sm icons" />
                <input
                  type="password"
                  className="form-control ps-5"
                  placeholder="Nhập lại Mật khẩu mới"
                  required
                />
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
