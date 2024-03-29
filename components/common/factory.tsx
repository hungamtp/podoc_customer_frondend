/* eslint-disable @next/next/no-img-element */
import { setHeaderInfo } from "@/redux/slices/headerInfo";
import { setIsEdit } from "@/redux/slices/isEdit";
import { FactoryDTO } from "@/services/type.dto";
import { Rating } from "@mui/material";
import { numberWithCommas } from "helper/number-util";
import { useRouter } from "next/router";
import { useAppDispatch } from "../hooks/reduxHook";

type Props = {
  factory: FactoryDTO;
  productName: string;
};
export default function Factory({ factory, productName }: Props) {
  const router = useRouter();
  const productId = router.query["rawProduct"];
  console.log(productId, "productId");
  const dispatch = useAppDispatch();
  const startDesign = () => {
    dispatch(setIsEdit(true)); //Không set true thì khi tạo xong mà muốn design tiếp sẽ lỗi

    dispatch(
      setHeaderInfo({
        factoryName: factory.name,
        productName: productName,
        rawProductPrice: factory.price,
        rawProductMaterial: factory.material,
      })
    );

    router.push(`/design?productId=${productId}&factoryId=${factory.id}`);
    //push sẽ hủy hết lệnh và route qua trang khác
  };
  const positionList = factory.area.map((area) => {
    if (area === "front") return "Trước";
    else return "Sau";
  });

  const sizeDefault = ["XS", "S", "M", "L", "XL", "2XL", "XXL", "3XL", "XXXL"];
  const selectdSize = ["XS", "XXL", "XXXL", "M"];
  var newSize = [];
  newSize = sizeDefault.filter((size) => {
    if (selectdSize.includes(size)) {
      return true;
    }
  });

  return (
    <section className="factory">
      <div className="container">
        <div className="card">
          <div className="card-header card-factory-header">
            <div className="right-card-factory-header">
              <span
                style={{
                  marginRight: " 20px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div>
                  <b className="mb-0 me-3"> {factory.name}</b>{" "}
                </div>
                <div>
                  {factory.rateCount > 0 && (
                    <span>
                      <div>
                        <div className="d-flex justify-content-between">
                          <div
                            className="d-flex"
                            style={{ justifyContent: "space-between" }}
                          >
                            <div className="me-3">
                              <Rating
                                name="half-rating"
                                value={factory?.rate}
                                size="medium"
                                sx={{ marginY: "auto" }}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <div style={{ marginTop: "2px" }}>
                              ({factory?.rateCount})
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  )}
                </div>
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
              <div
                className="card-factory-body-content"
                style={{ width: "450px" }}
              >
                <div className="small-text text-muted mb-0 card-body-title">
                  Địa chỉ
                </div>
                <div>
                  <i className="bi bi-geo-alt-fill text-info "></i>
                  <span className="mb-0">{factory.location}</span>
                </div>
              </div>
              <div
                className="card-factory-body-content ms-4"
                style={{ width: "240px" }}
              >
                <div className="small-text text-muted mb-0 card-body-title">
                  Giá
                </div>
                <div>{numberWithCommas(factory.price)} VND</div>
              </div>
              <div
                className="card-factory-body-content"
                style={{ width: "200px" }}
              >
                <div className="small-text text-muted mb-0 card-body-title">
                  Chất liệu
                </div>
                <div>{factory.material}</div>
              </div>
              <div style={{ width: "350px" }}>
                <div className="small-text text-muted mb-0 card-body-title">
                  Kích thước
                </div>
                <div>
                  {sizeDefault
                    .filter((size) => {
                      if (factory.sizes.includes(size)) {
                        return true;
                      }
                    })
                    .join(" , ")}
                </div>
              </div>
              <div style={{ width: "250px" }}>
                <div className="small-text text-muted mb-0 card-body-title">
                  Vị trí
                </div>
                <div>{positionList.join(" , ")}</div>
              </div>
              <div style={{ width: "200px" }}>
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
