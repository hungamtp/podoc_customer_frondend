/* eslint-disable react-hooks/rules-of-hooks */
import { EmptyLayout } from '@/components/layouts';
import useCompleteOrder from '@/hooks/api/order/use-complete-momo-order';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

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
    if(param["orderId"]){
        const { data: categories, isLoading: isCategoryLoading } = useCompleteOrder(param["orderId"][0]);
    }
    if(param["apptransid"]){
      const { data: categories, isLoading: isCategoryLoading } = useCompleteOrder(param["apptransid"]);
  }

  return (
    <div>
    <section className="bg-home bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">
              <div className="icon d-flex align-items-center justify-content-center bg-soft-primary rounded-circle mx-auto" style={{height: '90px', width: '90px'}}>
                <i className="uil uil-thumbs-up align-middle h1 mb-0" />
              </div>
              <h1 className="my-4 fw-bold">Thank You</h1>
              <p className="text-muted para-desc mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
              <Link href="/" className="btn btn-soft-primary mt-3"><a className="btn btn-soft-primary mt-3">Go To Home</a></Link>
            </div>
          </div>{/*end col*/}
        </div>{/*end row*/}
      </div> {/*end container*/}
    </section>{/*end section*/}
  </div>
  )
}
ThankYou.LayOut = EmptyLayout;