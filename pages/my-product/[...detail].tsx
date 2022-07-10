import { MainLayout } from "@/components/layouts";
import useGetDesignById from "@/hooks/api/design/use-get-design-by-id";
import { numberWithCommas } from "helper/number-util";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

export interface MyDesignDetailProps {}

export default function MyDesignDetail(props: MyDesignDetailProps) {
  const router = useRouter();

  const { detail } = router.query;
  const { data: response, isLoading: isLoading } = useGetDesignById(
    detail as string
  );

  return (
    <div>
      <section className="bg-invoice bg-light">
        <div className="container">
          {response && (
            <div className="row mt-5 pt-4 pt-sm-0 justify-content-center">
              <div className="col-lg-12">
                <div className="card shadow rounded border-0 mb-4">
                  <div className="card-body">
                    <div className="invoice-top pb-4 border-bottom">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="logo-invoice mb-2">
                            Hình ảnh thiết kế
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-middle py-4">
                      <div className="row mb-0">
                        <div className="col-md-3 d-flex flex-column justify-content-center">
                          <img
                            width="150rem"
                            src={response.imagePreviews[0].image}
                          />
                          <Link
                            href={`/my-product/edit-design?designId=${detail}&designName=${response.name}`}
                          >
                            <a>Chỉnh sửa thiết kế</a>
                          </Link>
                        </div>
                        <div className="col-md-6 order-md-2 order-1 mt-2 mt-sm-0">
                          <div className="pb-4">
                            <p className="h4">Chọn mặt áo</p>
                            <div className="">
                              <div className="row mb-0 d-flex w-half">
                                {response.imagePreviews.map((imagePreview) => (
                                  <>
                                    <div
                                      key={imagePreview.position}
                                      className="w-half"
                                    >
                                      <img
                                        height="100rem"
                                        src={imagePreview.image}
                                      />
                                      <p className="text-center">
                                        {imagePreview.position}
                                      </p>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <p className="h4">Chọn màu áo</p>
                            <div className="">
                              <div className=" mb-0 d-flex justify-content-between w-half">
                                {response.colorsObj.map((colorObj) => (
                                  <>
                                    <div key={colorObj.id} className="">
                                      <img
                                        height="100rem"
                                        src={response.imagePreviews[0].image}
                                      />
                                      <p className="text-center">
                                        {colorObj.name}
                                      </p>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end of mockup*/}
                <div className="card shadow rounded border-0 mb-4">
                  <div className="card-body">
                    <div className="invoice-top pb-4 border-bottom">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="logo-invoice mb-2">Mô tả</div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-middle py-4">
                      <div className="row mb-0">
                        <p className="h4 mb-4">Thông tin mô tả</p>

                        <form>
                          <div className="row">
                            {/*end col*/}
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Tên sản phẩm
                                </label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="book"
                                    className="fea icon-sm icons"
                                  />
                                  <input
                                    name="subject"
                                    id="subject"
                                    className="form-control ps-5"
                                    placeholder="Your subject :"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Giá thiết kế
                                </label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="book"
                                    className="fea icon-sm icons"
                                  />
                                  <input
                                    name="subject"
                                    id="subject"
                                    className="form-control ps-5"
                                    placeholder="Your subject :"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Giá từ nhà sản xuất
                                </label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="book"
                                    className="fea icon-sm icons"
                                  />
                                  {numberWithCommas(response.priceFromFactory)}{" "}
                                  VND
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">Tổng giá</label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="book"
                                    className="fea icon-sm icons"
                                  />
                                  {numberWithCommas(
                                    response.designedPrice +
                                      response.priceFromFactory
                                  )}{" "}
                                  VND
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="message-circle"
                                    className="fea icon-sm icons"
                                  />
                                  <textarea
                                    name="comments"
                                    id="comments"
                                    rows={4}
                                    className="form-control ps-5"
                                    placeholder="Your Message :"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*end row*/}
                          <div className="row">
                            <div className="col-sm-12">
                              <input
                                type="submit"
                                id="submit"
                                name="send"
                                className="btn btn-primary"
                                defaultValue="Send Message"
                              />
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </form>
                        {/*end form*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*end col*/}
            </div>
          )}
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
    </div>
  );
}
MyDesignDetail.Layout = MainLayout;
