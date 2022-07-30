/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from 'react';
import { ProductHomePage } from '@/services/type.dto';

import DesignedProduct from './designed-product';

type Props = {
  title: string;
  data: ProductHomePage[];
};

export default function DesignedProducts({ title, data }: Props) {
  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div className="row"></div>
      <div className="col-12">
        <h3 className="d-flex justify-content-center">{title}</h3>
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
