import * as React from "react";

export interface IDesignHeaderLeftProps {}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  return (
    <div>
      <div className="d-flex justify-content-between border-bottom border-dark py-0 px-0">
        <div className="d-flex">
          <p className="h6 px-4 m-auto">{`<--`} Back to My Products</p>
          <div className="d-flex flex-column justify-content-center">
            <p className="h5 pt-2">Áo thun name</p>
            <p className="text-secondary">Cung cấp bởi nhà in H2PD</p>
          </div>
        </div>
        <div className="d-flex justify-content-center w-quater align-items-center px-4">
          <button className="btn btn-secondary w-half">Edit</button>
          <button className="btn btn-light w-half">Preview</button>
        </div>
      </div>
    </div>
  );
}
