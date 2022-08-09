import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface IHeroProps {}

export default function Hero(props: IHeroProps) {
  const router = useRouter();
  const path = router.asPath;
  return (
    <div>
      <section
        className="bg-half-170 bg-light d-table w-100"
        style={{
          background: "url('/asset/images/banner/banner_fixed.jpg') no-repeat center center",
          marginTop: '30px',
        }}
      >
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h4 className="title mb-0">Chi tiết sản phẩm thiết kế</h4>
              </div>
            </div>
          </div>

          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a>PODOC</a>
                  </Link>
                </li>
                {path.includes('/my-product/order?designId=') ? (
                  <li className="breadcrumb-item">
                    <Link href="/account/mydesign">
                      <a>Thiết kế của tôi</a>
                    </Link>
                  </li>
                ) : (
                  <li className="breadcrumb-item">
                    <Link href="/designs">
                      <a>Thiết kế có sẵn</a>
                    </Link>
                  </li>
                )}
                <li className="breadcrumb-item active" aria-current="page">
                  Chi tiết thiết kế
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
