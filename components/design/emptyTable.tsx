import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { UploadImage } from "./upload-image";

export interface info {
  angle: number;
}

export interface ITableProps {
  addRect: (imgElement: string) => void;
}

export default function Table(props: ITableProps) {
  const infoManageData = useAppSelector((state) => state.infoManageData);
  console.log(infoManageData, "ìnoooo");
  const initVal = {
    images: [],
  };
  // const exportToJson = () => {
  // 	infoManageData.designInfos.reduce((pre, cur) => {});
  // };
  return (
    <div>
      <div className="">
        {infoManageData.designInfos.map((designInfo) => (
          <>
            {designInfo.key === infoManageData.choosenKey &&
              designInfo.key !== "" && (
                <div
                  key={designInfo.key}
                  className="mb-6 bg-white border rounded shadow"
                >
                  <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Table</h5>
                  </div>
                  <div className="p-5">
                    <table
                      className="w-full p-5 text-gray-700"
                      onClick={() => {
                        console.log("ahihi");
                      }}
                    >
                      <tbody>
                        <tr>
                          <td>Size</td>
                          <td>Width:{designInfo.width}</td>
                          <td>Height:{designInfo.height}</td>
                        </tr>
                        <tr>
                          <td>Transform</td>
                          <td>Rotate:{designInfo.rotate}</td>
                          <td>Scale:{designInfo.scale}</td>
                        </tr>
                        <tr>
                          <td>Positioning</td>
                          <td>Left:{designInfo.left}</td>
                          <td>Top:{designInfo.top}</td>
                        </tr>
                        <tr>
                          <td>Align</td>
                          <td>Left:{}</td>
                          <td>Top:{}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            {designInfo.key !== infoManageData.choosenKey && (
              <div>
                <div className="border-b h-screen p-3 mb-6 bg-white border rounded shadow">
                  <h5 className="font-bold uppercase text-gray-600">Table</h5>
                </div>
              </div>
            )}
          </>
        ))}
        <div>
          <p className="py-2">
            Add design
            <UploadImage addRect={props.addRect} />
          </p>
          {/* <button onClick={} className="py-2">
						Save
					</button> */}
        </div>
      </div>
    </div>
  );
}
