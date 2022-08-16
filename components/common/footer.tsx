/* eslint-disable react/jsx-no-target-blank */

type Props = {};

export default function Footer({}: Props) {

  return (
    <footer className="footer">
      <div className="container">
            <div className="footer-py-60">
              <div className="d-flex justify-content-center">
                      <h5 className="footer-head mb-0">Shopping & Clothes</h5>
              </div>
              <div className="d-flex justify-content-center">
                  <p className="mt-4">
                    PODOC sẽ mang đến cho bạn một trải nghiệm tốt nhất.
                  </p>
            </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-30 footer-border">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-truck align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Giao hàng nhanh</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-user-arrows align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Hỗ trợ 24/7</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-transaction align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Thanh toán online</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-shield-check align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Bảo mật thanh toán</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-30 footer-border">
              <div className="container text-center">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <div className="text-sm-start">
                      <p className="mb-0">
                        <strong>
                          @2022-Let your creativity on your T-shirt
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
