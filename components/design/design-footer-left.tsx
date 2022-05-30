import * as React from "react";

export interface IDesignHeaderLeftProps {}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  return (
    <div className="row h-10">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column">
        <div className="d-flex justify-content-between border-top border-dark  py-4">
          <div className="d-flex justify-content-start w-quater align-items-center px-4">
            <button className="btn btn-secondary w-half">Trước</button>
            <button className="btn btn-light w-half">Sau</button>
          </div>
        </div>
      </div>
      <div className="col-lg-3 d-md-none d-lg-block border-start px-0">
        <div className="d-flex justify-content-center border-top border-dark  py-4">
          <div className="d-flex  w-full align-items-center px-4">
            <button className="btn btn-secondary w-full">Lưu lại</button>
          </div>
        </div>
      </div>
    </div>
  );
}
