/* eslint-disable @next/next/no-img-element */
import { data } from 'jquery';
import { GetStaticProps } from 'next/types';
import React, { useEffect } from 'react';
import { Best4DesignedProduct, ProductHomePage } from '@/services/type.dto';
import { useGetHighestRateDesign } from '@/hooks/api/use-get-highest-rate-design';
import Product from './product';

type Props = {
  title: string;
  data: ProductHomePage[];
};

export default function Products({ title, data }: Props) {
  return (
    <div className="container mt-100 mt-60">
      <div className="row"></div>
      <div className="col-12">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="row">
        {data.map((item: ProductHomePage) => {
          return <Product key={item.id} product={item} />;
        })}
      </div>
    </div>
  );
}
