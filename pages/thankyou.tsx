/* eslint-disable react-hooks/rules-of-hooks */
import { EmptyLayout } from '@/components/layouts';
import useCompleteOrder from '@/hooks/api/order/use-complete-momo-order';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

export default function ThankYou({}: Props) {
  // response from momo
  //        ?partnerCode=MOMOQOYK20220626
  //            &orderId=1656439230514
  //            &requestId=1656439230514
  //            &amount=50000
  //            &orderInfo=Pay+With+MoMo&orderType=momo_wallet
  //            &transId=2694732419
  //            &resultCode=0
  //            &message=Successful.
  //            &payType=qr
  //            &responseTime=1656439248218
  //            &extraData=
  //    &signature=640a8e675597bbf0315f86426e07dee858df920bebc85a56e59db2cd1fe6a6d4
  const router = useRouter();
  const param = router.query;
  if (param['orderId']) {
    if (param['resultCode'] == '0') {
      useCompleteOrder(param['orderId'], param['transId']);
    }
  }
  if (param['apptransid']) {
    if (param['status'] == '1') {
      useCompleteOrder(param['apptransid'], param['zp_trans_id']);
    }
  }

  return (
    <div>
      <section
        className="bg-home bg-light d-flex align-items-center"
        style={{
          background: "url('/asset/images/shop/hp-3.jpg') ",
          objectFit: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="text-center">
                <div
                  className="icon d-flex align-items-center justify-content-center bg-soft-primary rounded-circle mx-auto"
                  style={{
                    height: '200px',
                    width: '200px',
                  }}
                >
                  <Image
                    src="/asset/images/logo_man.png"
                    className="avatar avatar rounded-circle"
                    width={1000}
                    height={1000}
                    objectFit="cover"
                    alt="productImage"
                  />
                </div>
                <h1 className="my-4 fw-bold">Cảm ơn bạn</h1>
                <p className="text-muted para-desc mx-auto ">
                  {`PODOC xin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng
                  tôi.`}
                </p>
                <p className="text-muted para-desc mx-auto">
                  {`Đơn hàng đã được xác nhận thanh toán, bạn có thể theo dõi đơn hàng tại`} <span className="text-success">đây</span>
                </p>

                <Link href="/" className="btn btn-soft-primary mt-3">
                  <a className="btn btn-soft-primary mt-3">Về trang chủ</a>
                </Link>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>{' '}
        {/*end container*/}
      </section>
      {/*end section*/}
    </div>
  );
}
ThankYou.LayOut = EmptyLayout;
