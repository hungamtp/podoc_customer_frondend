/* eslint-disable react-hooks/rules-of-hooks */
import { EmptyLayout } from "@/components/layouts";
import useCompleteOrder from "@/hooks/api/order/use-complete-momo-order";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
  if (param["orderId"]) {
    console.log(param["orderId"])
    const { data: categories, isLoading: isCategoryLoading } = useCompleteOrder(
      param["orderId"]
    );
  }
  if (param["apptransid"]) {
    console.log(param["apptransid"])
    const { data: categories, isLoading: isCategoryLoading } = useCompleteOrder(
      param["apptransid"]
    );
  }

  return (
    <div>
      <section
        className="bg-home bg-light d-flex align-items-center"
        style={{
          background: "url('/asset/images/shop/hp-3.jpg') center center ",
          backgroundSize: "1500px 850px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="text-center">
                <div
                  className="icon d-flex align-items-center justify-content-center bg-soft-primary rounded-circle mx-auto"
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                >
                  <img
                    src="/asset/images/logo_man.png"
                    height="200"
                    className="logo-light-mode"
                    alt=""
                  />
                </div>
                <h1 className="my-4 fw-bold">C???m ??n b???n</h1>
                <p className="text-muted para-desc mx-auto ">
                  {`PODOC xin ch??n th??nh c???m ??n b???n ???? s??? d???ng d???ch v??? c???a ch??ng
                  t??i.`}
                </p>
                <p className="text-muted para-desc mx-auto">
                  {`????n h??ng ???? ???????c x??c nh???n thanh to??n, b???n c?? th??? theo d??i ????n h??ng t???i`}{" "}
                  <span className="text-success">????y</span>
                </p>

                <Link href="/" className="btn btn-soft-primary mt-3">
                  <a className="btn btn-soft-primary mt-3">V??? trang ch???</a>
                </Link>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>{" "}
        {/*end container*/}
      </section>
      {/*end section*/}
    </div>
  );
}
ThankYou.LayOut = EmptyLayout;
