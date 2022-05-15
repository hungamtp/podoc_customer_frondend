/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import ImageUploading from "react-images-uploading";
import { UploadImage } from "./upload-image";
export interface info {
  angle: number;
}

export interface ITableProps {
  addRect: (imgElement: string) => void;
}
type Props = {};

export default function Table(props: ITableProps) {
  const infoManageData = useAppSelector((state) => state.infoManageData);
  console.log(infoManageData, "ìnoooo");
  const initVal = {
    images: [],
  };
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {infoManageData.designInfos.map((designInfo) => (
                <>
                  {designInfo.key === infoManageData.choosenKey &&
                    designInfo.key !== "" && (
                      <div key={designInfo.key}>
                        <div className="table-responsive bg-white shadow rounded">
                          <table className="table mb-0 table-center">
                            <tbody>
                              <tr className="shop-list">
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="images/shop/product/s1.jpg"
                                      className="img-fluid avatar avatar-small rounded shadow"
                                      style={{ height: "auto" }}
                                      alt=""
                                    />
                                    <h6 className="mb-0 ms-3">Size</h6>
                                  </div>
                                </td>
                                <td className="text-center"> 255.00</td>
                                <td className="text-center"> 255.00</td>
                              </tr>
                              <tr className="shop-list">
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="images/shop/product/s3.jpg"
                                      className="img-fluid avatar avatar-small rounded shadow"
                                      style={{ height: "auto" }}
                                      alt=""
                                    />
                                    <h6 className="mb-0 ms-3">Transform</h6>
                                  </div>
                                </td>
                                <td className="text-center"> 520.00</td>
                                <td className="text-center"> 255.00</td>
                              </tr>
                              <tr className="shop-list">
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="images/shop/product/s6.jpg"
                                      className="img-fluid avatar avatar-small rounded shadow"
                                      style={{ height: "auto" }}
                                      alt=""
                                    />
                                    <h6 className="mb-0 ms-3">Positioning</h6>
                                  </div>
                                </td>
                                <td className="text-center"> 160.00</td>
                                <td className="text-center"> 255.00</td>
                              </tr>
                              <tr className="shop-list">
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="images/shop/product/s10.jpg"
                                      className="img-fluid avatar avatar-small rounded shadow"
                                      style={{ height: "auto" }}
                                      alt=""
                                    />
                                    <h6 className="mb-0 ms-3">Align</h6>
                                  </div>
                                </td>
                                <td className="text-center"> 260.00</td>
                                <td className="text-center"> 255.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  {designInfo.key !== infoManageData.choosenKey && (
                    <div>
                      <div className="border-b p-3 mb-6 bg-white border rounded shadow">
                        <h5 className="font-bold uppercase text-gray-600">
                          Table
                        </h5>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
            {/*end col*/}
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-6 mt-4 pt-2">
              <button className="btn btn-primary">Add</button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-6 mt-4 pt-2">Add design</div>
            <UploadImage addRect={props.addRect} />
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
    </>
  );
}
