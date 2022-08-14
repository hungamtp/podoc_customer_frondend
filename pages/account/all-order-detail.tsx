/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import CommentProduct from "@/components/common/comment";
import PaginationComponent from "@/components/common/mui-pagination";
import { Account } from "@/components/layouts";
import useAllOrderDetail from "@/hooks/api/order/use-all-order-detail";
import { Filter } from "@/services/design";
import { Dialog, DialogContent } from "@material-ui/core";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

export interface IAllOrderDetailProps {}

const convertStatus = (status: string) => {
  let tmpOrderStatusData = "";
  if (status === "PENDING") {
    tmpOrderStatusData = "Chờ xác nhận";
  } else if (status === "PRINTING") {
    tmpOrderStatusData = "Đang xử lí";
  } else if (status === "PACKAGING") {
    tmpOrderStatusData = "Đang đóng gói";
  } else if (status === "DELIVERING") {
    tmpOrderStatusData = "Đang giao hàng";
  } else if (status === "DELIVERED") {
    tmpOrderStatusData = "Đã giao";
  } else if (status === "DONE") {
    tmpOrderStatusData = "Hoàn thành";
  }
  return tmpOrderStatusData;
};

export default function AllOrderDetail(props: IAllOrderDetailProps) {
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 4,
  });

  const { data: allOrdersResponse, isLoading: isLoadingAllOrders } =
    useAllOrderDetail(filter);

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [designId, setDesignId] = React.useState("");
  const [orderId, setOrderId] = React.useState("");
  const [isOpenSuccessRating, setIsOpenSuccessRating] = React.useState(false);
  const router = useRouter();

  const handleOpenDialog = (designId: string, orderId: string) => {
    setIsOpenDialog(true);
    setDesignId(designId);
    setOrderId(orderId);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <>
        <Dialog
          open={isOpenDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          disableEnforceFocus
        >
          <DialogContent>
            <CommentProduct
              setIsOpenSuccessRating={setIsOpenSuccessRating}
              handleCloseDialog={handleCloseDialog}
              designId={designId}
              orderDetailId={orderId}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={isOpenSuccessRating}
          onClose={() => setIsOpenSuccessRating(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown
        >
          <DialogContent className="">
            <div className="">
              <div className=" d-flex justify-content-center">
                <Image
                  src="/asset/images/logo_man.png"
                  className="avatar avatar rounded-circle "
                  width={150}
                  height={150}
                  objectFit="cover"
                  alt="productImage"
                />
              </div>
              <div>Cảm ơn vì ý kiến đánh giá của bạn.</div>
              <div className=" d-flex justify-content-center">
                <button
                  className="btn btn-primary ps-4 pe-4"
                  onClick={() => setIsOpenSuccessRating(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {allOrdersResponse && allOrdersResponse.data.length > 0 ? (
          <div className=" bg-white shadow rounded">
            <table className="table mb-0, table-center table-nowrap">
              <thead>
                <tr>
                  <th
                    style={{ minWidth: "50px", width: "120px" }}
                    scope="col"
                    className="border-bottom align-middle"
                  >
                    Hình ảnh
                  </th>
                  <th
                    scope="col"
                    className="border-bottom align-middle"
                    style={{ minWidth: "200px", width: "220px" }}
                  >
                    Thiết kế
                  </th>
                  <th scope="col" className="border-bottom align-middle">
                    Thông tin
                  </th>
                  <th scope="col" className="border-bottom align-middle">
                    Ngày tạo
                  </th>
                  <th
                    scope="col"
                    className="border-bottom align-middle"
                    style={{ minWidth: "20px" }}
                  >
                    Tổng giá(VND)
                  </th>
                  <th
                    scope="col"
                    className="border-bottom align-middle"
                    style={{ minWidth: "20px" }}
                  >
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoadingAllOrders &&
                  allOrdersResponse &&
                  allOrdersResponse.data.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className=" border-secondary">
                          <Image
                            src={order.designImage}
                            width={1000}
                            height={1000}
                            objectFit="cover"
                            alt="productImage"
                          />
                        </div>
                      </td>
                      <td className=" align-middle">
                        <ul style={{ listStyleType: "none", padding: "0" }}>
                          <li style={{ minWidth: "200px", width: "220px" }}>
                            <p className="text-truncate m-0">
                              Tên: {order.designName}
                            </p>
                          </li>
                          <li style={{ minWidth: "200px", width: "220px" }}>
                            <p className="text-truncate mt-1">
                              Nhà in: {order.provider}
                            </p>
                          </li>
                        </ul>
                      </td>
                      <td
                        className=" align-middle"
                        style={{ minWidth: "100px", width: "120px" }}
                      >
                        <div>Size : {order.size}</div>
                        <div>Màu : {order.color}</div>
                        <div>Số lượng : {order.quantity}</div>
                      </td>
                      <td className=" align-middle">{`${new Date(
                        order.date
                      ).getDate()}-${new Date(
                        order.date
                      ).getMonth()}-${new Date(order.date).getFullYear()}`}</td>
                      <td className=" align-middle">
                        {numberWithCommas(order.price)}
                      </td>
                      <td className=" align-middle">
                        {order.status === "DONE" ? (
                          <div className="badge bg-success p-1 ">
                            {convertStatus(order.status)}
                          </div>
                        ) : (
                          <div className="badge bg-warning  p-1">
                            {convertStatus(order.status)}
                          </div>
                        )}
                      </td>
                      <td className="align-middle">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-icon btn-light dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bi bi-three-dots cursor-pointer fa-lg"></i>
                          </button>

                          <div className="dropdown-menu dd-menu dropdown-menu-start rounded border ">
                            {order.rated == false && order.status === "DONE" && (
                              <div
                                className="d-flex align-items-center mt-1  hoverButton text-center p-2"
                                onClick={() => {
                                  handleOpenDialog(order.designId, order.id);
                                }}
                              >
                                Đánh giá
                              </div>
                            )}
                            <div
                              className="d-flex align-items-center mt-1  hoverButton text-center p-2"
                              onClick={() =>
                                router.push(`/designs/${order.designId}`)
                              }
                            >
                              Mua lại
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="row">
              {Math.ceil(allOrdersResponse.elements / filter.pageSize) <= 1 ? (
                <></>
              ) : (
                <div className="d-flex justify-content-center">
                  <PaginationComponent
                    total={Math.ceil(
                      allOrdersResponse.elements / filter.pageSize
                    )}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <h4 style={{ display: "flex", justifyContent: "space-around" }}>
            Chưa có đơn đặt hàng
          </h4>
        )}
      </>
    </>
  );
}

AllOrderDetail.Layout = Account;
