import { Rating } from '@mui/material';
import * as React from 'react';

export interface IShowRatingProps {
  rate: number;
  rateCount: number;
}

export default function ShowRating({ rate, rateCount }: IShowRatingProps) {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
          <div>
            <Rating name="half-rating" value={rate} size="medium" sx={{ marginY: 'auto' }} precision={0.5} readOnly />
          </div>
          <div className="list-unstyled text-warning  ">({rate.toFixed(2)})</div>
        </div>
      </div>
      <span className="sold-number ">{`Đánh giá : ${rateCount} `}</span>
    </div>
  );
}
