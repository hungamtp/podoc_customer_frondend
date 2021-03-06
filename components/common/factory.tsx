/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { FactoryDTO } from "@/services/type.dto";
import { useAppDispatch } from "../hooks/reduxHook";
import { setIsEdit } from "@/redux/slices/isEdit";
import { numberWithCommas } from "helper/number-util";
import { setHeaderInfo } from "@/redux/slices/headerInfo";

type Props = {
  factory: FactoryDTO;
  productName: string;
};
export default function Factory({ factory, productName }: Props) {
  const router = useRouter();
  const productId = router.asPath.split("id=")[1];
  const dispatch = useAppDispatch();
  const startDesign = () => {
    dispatch(setIsEdit(true)); //Không set true thì khi tạo xong mà muốn design tiếp sẽ lỗi

    dispatch(
      setHeaderInfo({ factoryName: factory.name, productName: productName })
    );

    router.push(`/design?productId=${productId}&factoryId=${factory.id}`);
    //push sẽ hủy hết lệnh và route qua trang khác
  };

  return (
    <section className="factory">
      <div className="container">
        <div className="card">
          <div className="card-header card-factory-header">
            <div className="right-card-factory-header">
              <span style={{ marginRight: " 20px" }}>
                <b className="mb-0"> {factory.name}</b>
              </span>
            </div>

            <div className="left-card-factory-header">
              <span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => startDesign()}
                >
                  Bắt đầu thiết kế
                </button>
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="card-factory-body">
              <div className="card-factory-body-content">
                <div className="small-text text-muted mb-0 card-body-title">
                  Địa chỉ
                </div>
                <div>
                  <i className="bi bi-geo-alt-fill text-info"></i>
                  <span className="mb-0">{factory.location}</span>
                </div>
              </div>
              <div className="card-factory-body-content">
                <div className="small-text text-muted mb-0 card-body-title">
                  Giá
                </div>
                <div>{numberWithCommas(factory.price)} VND</div>
              </div>
              <div>
                <div className="small-text text-muted mb-0 card-body-title">
                  Kích thước
                </div>
                <div>{factory.sizes.join(" , ")}</div>
              </div>
              <div>
                <div className="small-text text-muted mb-0 card-body-title">
                  Vị trí
                </div>
                <div>{factory.area.join(" , ")}</div>
              </div>
              <div>
                <div className="small-text mb-0 card-body-title">Màu</div>
                <div>
                  <ul className="list-unstyled mb-0">
                    <li className="list-inline-item">
                      {factory.colors.map((color) => (
                        <img
                          key={color}
                          width={22}
                          height={22}
                          className="rounded-circle border"
                          src={
                            "https://images.printify.com/5853fec7ce46f30f8328200a"
                          }
                          style={{ backgroundColor: color }}
                          alt={color}
                        />
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
