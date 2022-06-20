/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import { ProductHomePage } from "@/services/type.dto";

import DesignedProduct from "./designed-product";

type Props = {
  title: string;
  data: ProductHomePage[];
};

export default function DesignedProducts({ title, data }: Props) {
  return (
    <div className="container mt-100 mt-60">
      <div className="row"></div>
      <div className="col-12">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="row">
        {data &&
          data.map((item: ProductHomePage) => {
            return <DesignedProduct key={item.id} product={item} />;
          })}
      </div>
    </div>
  );
}
