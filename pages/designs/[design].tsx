/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { PageWithHero } from "@/components/layouts/page-with-hero";
import useGetOthersDesignById from "@/hooks/api/design/use-get-others-design-by-id";
import { useRouter } from "next/router";
import * as React from "react";

export default function DesignedProductDetail() {
  const router = useRouter();

  const { design } = router.query;
  const { data: designedProduct, isLoading: isLoading } =
    useGetOthersDesignById(Number(design));
  const getRates = (rate: number): number[] => {
    let result = [];
    rate = Math.ceil(rate);
    for (var i = 1; i <= rate; i++) {
      result.push(i);
    }
    return result;
  };
  const getUnRates = (rate: number): number[] => {
    let result = [];
    rate = Math.ceil(rate);
    for (var i = 1; i <= 5 - rate; i++) {
      result.push(i);
    }
    return result;
  };
  const goToProfile = (userId: number) => {
    console.log(userId);
  };
  const [checked, setChecked] = React.useState<string>();
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setChecked(event.target.checked);
    // if (checked === true) {
    //   setCheckValue(event.target.value);
    //   console.log(checkValue, "check");
    // }
    // console.log(checked, "check");
  };

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          {designedProduct && (
            <div>
              <section className="section pb-0">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <div className="tiny-single-item">
                        <div className="tiny-slide">
                          <img
                            src={designedProduct.imagePreviews[0].image}
                            className="img-fluid rounded"
                            alt="productImage"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                      <div className="section-title ms-md-4">
                        <h4 className="title"> {designedProduct?.name}</h4>
                        <div className="d-flex">
                          <ul className="list-unstyled">
                            {getRates(designedProduct.rating).map((rate) => {
                              return (
                                <li
                                  key={rate}
                                  className="list-inline-item text-warning "
                                >
                                  <i className="mdi mdi-star"></i>
                                </li>
                              );
                            })}
                            {getUnRates(designedProduct.rating).map((rate) => {
                              return (
                                <li key={rate} className="list-inline-item">
                                  <i className="mdi mdi-star"></i>
                                </li>
                              );
                            })}
                          </ul>
                          <span className="list-unstyled text-warning  ">
                            ({designedProduct.rating})
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            ${designedProduct.price}
                          </h6>
                        </div>
                        <div>
                          <span className="sold-number ">
                            Đã bán {designedProduct.sold}
                          </span>
                        </div>
                        <div className="designer cursor-pointer">
                          Thiết kế bởi{" "}
                          <span
                            onClick={() => goToProfile(designedProduct.user.id)}
                          >
                            <b>
                              {designedProduct.user.firstName +
                                " " +
                                designedProduct.user.lastName}
                            </b>
                          </span>
                        </div>

                        <h5 className="mt-4 py-2">Mô tả chi tiết:</h5>
                        <p className="text-muted">
                          {designedProduct.description}
                        </p>
                        <ul className="list-unstyled text-muted">
                          <li className="mb-1">
                            <span className="text-primary h5 me-2">
                              <i className="uil uil-check-circle align-middle" />
                            </span>
                            Digital Marketing Solutions for Tomorrow
                          </li>
                          <li className="mb-1">
                            <span className="text-primary h5 me-2">
                              <i className="uil uil-check-circle align-middle" />
                            </span>
                            Our Talented &amp; Experienced Marketing Agency
                          </li>
                          <li className="mb-1">
                            <span className="text-primary h5 me-2">
                              <i className="uil uil-check-circle align-middle" />
                            </span>
                            Create your own skin to match your brand
                          </li>
                        </ul>

                        <div>
                          <div className="row mt-4 pt-2">
                            <div className="col-lg-6 col-12">
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0">Size:</h6>
                                <ul className="list-unstyled mb-0 ms-3">
                                  <li className="list-inline-item">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      S
                                    </a>
                                  </li>
                                  <li className="list-inline-item ms-1">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      M
                                    </a>
                                  </li>
                                  <li className="list-inline-item ms-1">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      L
                                    </a>
                                  </li>
                                  <li className="list-inline-item ms-1">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      XL
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="d-flex align-items-center pt-4">
                                <h6 className="mb-0">Màu:</h6>
                                <ul className="list-unstyled mb-0 ms-3">
                                  <li className="list-inline-item">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      S
                                    </a>
                                  </li>
                                  <li className="list-inline-item ms-1">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      M
                                    </a>
                                  </li>
                                  <li className="list-inline-item ms-1">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      L
                                    </a>
                                  </li>
                                  <li className="list-inline-item ms-1">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-icon btn-soft-primary"
                                    >
                                      XL
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                              <div className="d-flex shop-list align-items-center">
                                <h6 className="mb-0">Quantity:</h6>
                                <div className="qty-icons ms-3">
                                  <button className="btn btn-icon btn-soft-primary minus">
                                    -
                                  </button>
                                  <input
                                    min={0}
                                    name="quantity"
                                    defaultValue={0}
                                    type="number"
                                    className="btn btn-icon btn-soft-primary qty-btn quantity"
                                  />
                                  <button className="btn btn-icon btn-soft-primary plus">
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                          <div className="mt-4 pt-2">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-primary"
                            >
                              Shop Now
                            </a>
                            <a
                              href="shop-cart.html"
                              className="btn btn-soft-primary ms-2"
                            >
                              Add to Cart
                            </a>
                          </div>
                        </div>

                        <div className="row mt-4 pt-2">
                          <div className="col-lg-6 col-12">
                            <div className="d-flex align-items-center"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <>
                  <section className="factory">
                    <div className="container">
                      <div className="card">
                        <div className="card-header no-factory">
                          No factory sell this product yet.
                        </div>
                      </div>
                    </div>
                  </section>
                </> */}
              </section>
            </div>
          )}
        </div>
      )}
    </>
  );
}
DesignedProductDetail.Layout = PageWithHero;
