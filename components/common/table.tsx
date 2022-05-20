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
                        <div className="border border-dark border-3 border-bottom-0">
                          Info
                        </div>
                        <table className=" table table-borderless table-center border border-dark border-3 ">
                          <tr className="shop-list">
                            <td className="text-start"></td>
                            <td className="text-start">Width</td>
                            <td className="text-start">Height</td>
                          </tr>
                          <tr className="shop-list">
                            <td className="text-start p-3">Size</td>
                            <td className="text-start ">300</td>
                            <td className="text-start">300</td>
                          </tr>
                          <tr className="shop-list">
                            <td className="text-start"></td>
                            <td className="text-start">Rotate</td>
                            <td className="text-start">Scale</td>
                          </tr>
                          <tr className="shop-list">
                            <td className="text-start p-3">Transform</td>
                            <td className="text-start">300</td>
                            <td className="text-start">300</td>
                          </tr>
                          <tr className="shop-list">
                            <td className="text-start"></td>
                            <td className="text-start">Left</td>
                            <td className="text-start">Top</td>
                          </tr>
                          <tr className="shop-list">
                            <td className="text-start p-3">Positioning</td>
                            <td className="text-start">300</td>
                            <td className="text-start">300</td>
                          </tr>
                          <tr className="shop-list">
                            <td className="text-start p-3">Align</td>
                            <td className="text-start">300</td>
                            <td className="text-start">300</td>
                          </tr>
                        </table>
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
