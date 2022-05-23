import * as React from "react";

export interface IDesignFooterRightProps {}

export default function DesignFooterRight(props: IDesignFooterRightProps) {
  return (
    <div>
      <div className="d-flex justify-content-center border-top border-dark  py-4">
        <div className="d-flex  w-full align-items-center px-4">
          <button className="btn btn-secondary w-full">Back</button>
        </div>
      </div>
    </div>
  );
}
