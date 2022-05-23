import * as React from "react";

export interface IDesignHeaderRightProps {}

export default function DesignHeaderRight(props: IDesignHeaderRightProps) {
  return (
    <div>
      <div className="d-flex justify-content-around border-bottom  border-dark  py-3point5 px-0">
        <p className="h4">Thêm thiết kế</p>
        <p className="">Giá và thông số thêm</p>
      </div>
    </div>
  );
}
