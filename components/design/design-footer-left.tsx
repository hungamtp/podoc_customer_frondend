import * as React from "react";

export interface IDesignHeaderLeftProps {}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  return (
    <div>
      <div className="d-flex justify-content-between border-top border-dark  py-4">
        <div className="d-flex justify-content-start w-quater align-items-center px-4">
          <button className="btn btn-secondary w-half">Back</button>
          <button className="btn btn-light w-half">Front</button>
        </div>
      </div>
    </div>
  );
}
