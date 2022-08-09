/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { EmptyLayout } from "@/components/layouts";
import useConfirmEmail from "@/hooks/api/account/use-confirm-email";
import useCompleteOrder from "@/hooks/api/order/use-complete-momo-order";
import { confirmEmail } from "@/services/account";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

export default function ConfirmEmail({}: Props) {
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
    const { data: categories, isLoading: isCategoryLoading } = useCompleteOrder(
      param["orderId"][0]
    );
  }
  if (param["apptransid"]) {
    const { data: categories, isLoading: isCategoryLoading } = useCompleteOrder(
      param["apptransid"][0]
    );
  }
  const email = router.asPath.split("/")[3];
  const id = router.asPath.split("/")[4];

  useEffect(() => {
    if (router) confirmEmail(email, id);
  }, [router]);

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
            <div className="col-lg-5 col-md-6">
              <div className="card login-page bg-white shadow rounded border-0">
                <div className="card-body">
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
                    <h1 className="my-4 fw-bold fs-4">
                      Xác nhận email thành công
                    </h1>
                    <p className="text-muted para-desc mx-auto ">
                      {`PODOC xin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng
                  tôi.`}
                    </p>

                    <button
                      className="btn btn-primary"
                      onClick={() => confirm()}
                    >
                      Đồng ý
                    </button>
                  </div>
                </div>
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
ConfirmEmail.LayOut = EmptyLayout;
