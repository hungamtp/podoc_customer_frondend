/* eslint-disable @next/next/no-img-element */
import CommentProduct from "@/components/common/comment";
import useDeleteOrder from "@/hooks/api/order/use-delete-order";
import useGetOrderDetailByOrderId from "@/hooks/api/order/use-get-order-detail-by-orderId";
import usePayUnpaidOrder from "@/hooks/api/order/use-pay-unpaid-order";
import { Filter } from "@/services/order";
import { GetAllMyOrdersDto, OrderDetailDto } from "@/services/order/dto";
import { Dialog, DialogContent } from "@material-ui/core";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import CustomAutoCompleteSelect from "../design/custom-auto-complete-selecte";
import PaginationComponent from "./mui-pagination";
import { MyOrdersDto } from "@/services/order/dto";
import { useQueryClient } from "react-query";
import CancelOrderStatus from "./cancel-order-status";

type Props = {
  myOrdersResponse: GetAllMyOrdersDto;
  isLoading: boolean;
  setFilter: (filter: Filter) => void;
  filter: Filter;
  handleFilter: (criteria: string) => void;
  criteria: string;
};

const hanleOrderStatus = (order: MyOrdersDto) => {
  if (order.isPaid && !order.canceled) {
    return "Đã thanh toán";
  } else if (order.canceled) {
    return "Đã hủy đơn";
  } else if (!order.isPaid) {
    return "Chưa thanh toán";
  }
};

const criteriaEnum = [
  {
    label: "Tất cả đơn hàng",
    value: "all",
  },
  {
    label: "Đơn hàng đã hủy",
    value: "cancel",
  },
  { label: "Đơn hàng chưa thanh toán", value: "unpaid" },
  {
    label: "Đơn hàng đã thanh toán",
    value: "pending",
  },
];

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
  } else if (status === "IS_CANCEL") {
    tmpOrderStatusData = "Đã hủy đơn";
  }

  return tmpOrderStatusData;
};

export default function MyOrdersTable({
  myOrdersResponse,
  isLoading,
  filter,
  setFilter,
  handleFilter,
  criteria,
}: Props) {
  const query = useQueryClient();
  const [openCancelOrderDialog, setOpenCancelOrderDialog] =
    React.useState(false);

  const handleClickOpenCancelOrder = () => {
    setOpenCancelOrderDialog(true);
  };

  const handleCloseOrderDialog = () => {
    setOpenCancelOrderDialog(false);
  };
  const { mutate: payOrder } = usePayUnpaidOrder();
  const [isShowOrderDetail, setIsShowOrderDetail] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState<OrderDetailDto[]>();
  const [selectedOrderDetailId, setSelectedOrderDetailId] =
    useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<MyOrdersDto>(
    myOrdersResponse.data[0] || ""
  );
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [designId, setDesignId] = React.useState("");
  React.useEffect(() => {
    if (myOrdersResponse) {
      if (selectedOrder.orderId) {
        myOrdersResponse.data.forEach((order) => {
          if (selectedOrder.orderId === order.orderId) {
            setOrderDetailData(order.orderDetailDtos);
          }
        });
      }
    }
  }, [myOrdersResponse]);

  const [isOpenSuccessRating, setIsOpenSuccessRating] = React.useState(false);
  const router = useRouter();

  const handleOpenDialog = (designId: string, orderDetailId: string) => {
    setDesignId(designId);
    setSelectedOrderDetailId(orderDetailId);
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleSubmit = (paymentMethod: number, orderId: string) => {
    const tmpData = {
      paymentMethod: paymentMethod,
      orderId: orderId,
    };
    payOrder(tmpData);
  };
  return (
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
          {selectedOrderDetailId && (
            <CommentProduct
              setIsOpenSuccessRating={setIsOpenSuccessRating}
              handleCloseDialog={handleCloseDialog}
              designId={designId}
              orderDetailId={selectedOrderDetailId}
            />
          )}
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

      <Dialog
        open={openCancelOrderDialog}
        onClose={handleCloseOrderDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogContent>
          <CancelOrderStatus
            handleCloseDialog={handleCloseOrderDialog}
            orderId={selectedOrder.orderId}
            setIsShowOrderDetail={setIsShowOrderDetail}
          />
        </DialogContent>
      </Dialog>
      {!isShowOrderDetail && (
        <div className="d-flex justify-content-start">
          <div className="w-25">
            <CustomAutoCompleteSelect
              handleChange={handleFilter}
              list={criteriaEnum}
              data={criteria}
            />
          </div>
        </div>
      )}
      {myOrdersResponse && myOrdersResponse.data.length != 0 ? (
        <div>
          {isShowOrderDetail ? (
            <>
              {orderDetailData && selectedOrder && (
                <div>
                  <button
                    className="btn btn-secondary mb-4"
                    onClick={() => {
                      setIsShowOrderDetail(false);
                    }}
                  >
                    Trở về
                  </button>

                  <div className="table bg-white shadow rounded table-responsive-lg">
                    <table className="table mb-0 table-center table-nowrap ">
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
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                          >
                            Thông tin
                          </th>
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                          >
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
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                            style={{ minWidth: "20px" }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetailData &&
                          orderDetailData.map((order) => (
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
                                <ul
                                  style={{
                                    listStyleType: "none",
                                    padding: "0",
                                  }}
                                >
                                  <li
                                    style={{
                                      minWidth: "200px",
                                      width: "220px",
                                    }}
                                  >
                                    <p className="text-truncate m-0">
                                      Tên: {order.designName}
                                    </p>
                                  </li>
                                  <li
                                    style={{
                                      minWidth: "200px",
                                      width: "220px",
                                    }}
                                  >
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
                              ).getMonth()}-${new Date(
                                order.date
                              ).getFullYear()}`}</td>
                              <td className=" align-middle">
                                {numberWithCommas(order.price)}
                              </td>
                              <td className=" align-middle">
                                {order.status === "DONE" ? (
                                  <div className="badge bg-success p-1 ">
                                    {convertStatus(order.status)}
                                  </div>
                                ) : (
                                  <div
                                    className={`badge ${
                                      order.status === "IS_CANCEL"
                                        ? "bg-secondary"
                                        : "bg-warning"
                                    }  p-1`}
                                  >
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

                                  <div className="dropdown-menu dd-menu dropdown-menu-end rounded border ">
                                    {order.rated === false &&
                                      order.status === "DONE" && (
                                        <div
                                          className="hoverButton text-start p-2"
                                          onClick={() => {
                                            handleOpenDialog(
                                              order.designId,
                                              order.id
                                            );
                                          }}
                                        >
                                          <i className="bi bi-card-text me-2"></i>
                                          Đánh giá
                                        </div>
                                      )}
                                    <div
                                      className="hoverButton text-start p-2"
                                      onClick={() =>
                                        router.push(
                                          `/designs/${order.designId}`
                                        )
                                      }
                                    >
                                      <i className="bi bi-cart me-2"></i>
                                      Mua lại
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-end">
                    {selectedOrder.canCancel && !selectedOrder.canceled && (
                      <button
                        className="btn btn-danger d-flex align-items-center me-4"
                        onClick={() => handleClickOpenCancelOrder()}
                      >
                        <i className="bi bi-x-square  me-2"></i>
                        <p className="m-0">Hủy đơn</p>
                      </button>
                    )}
                    {!selectedOrder.isPaid && !selectedOrder.canceled && (
                      <div className="dropdown align-middle">
                        <button
                          type="button"
                          className="btn btn-success dropdown-toggle d-flex align-items-center "
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bi bi-credit-card me-2"></i>
                          <p className="m-0">Thanh toán</p>
                        </button>

                        <div className="dropdown-menu dd-menu dropdown-menu-end rounded border">
                          <div
                            onClick={() =>
                              handleSubmit(0, selectedOrder.orderId)
                            }
                            className="d-flex align-items-center mt-1 hoverButton ps-2"
                          >
                            <img
                              className="me-1 rounded"
                              src="/asset/images/momologo.svg"
                              width="25"
                              alt="momo"
                            />
                            MOMO
                          </div>
                          <div
                            onClick={() =>
                              handleSubmit(1, selectedOrder.orderId)
                            }
                            className="d-flex align-items-center mt-1 hoverButton ps-2"
                          >
                            <img
                              className="me-1 rounded"
                              src="/asset/images/zalopay.png"
                              width="25"
                              alt="momo"
                            />
                            Zalo
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="table bg-white shadow rounded table-responsive-lg">
                <table className="table mb-0 table-center table-nowrap">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-bottom align-middle w-25"
                        style={{ minWidth: "200px" }}
                      >
                        Thông tin
                      </th>
                      <th scope="col" className="border-bottom align-middle">
                        Ngày tạo
                      </th>
                      <th scope="col" className="border-bottom align-middle">
                        Tổng giá (VND)
                      </th>
                      <th scope="col" className="border-bottom align-middle">
                        Số lượng
                      </th>
                      <th
                        scope="col"
                        className="border-bottom"
                        style={{ width: "80px" }}
                      >
                        Trạng thái
                      </th>
                      <th
                        scope="col"
                        className="border-bottom"
                        style={{ width: "80px" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      myOrdersResponse &&
                      myOrdersResponse.data.map((orders) => (
                        <tr
                          key={orders.orderId}
                          data-toggle="tooltip"
                          data-placement="top"
                        >
                          <td className="">
                            <div
                              style={{ minWidth: "200px", width: "300px" }}
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Xem chi tiết đơn hàng"
                              className=" align-middle"
                            >
                              {orders.orderDetailDtos
                                .filter((orderDetail, index) => index <= 1)
                                .map((orderDetail, insideIndex, newList) => {
                                  if (
                                    newList.length <
                                      orders.orderDetailDtos.length &&
                                    insideIndex === newList.length - 1
                                  )
                                    return (
                                      <>
                                        <div className="mt-2 mb-0 d-flex justify-content-start">
                                          <div className="text-truncate w-50 text-start">{`${orderDetail.designName}`}</div>
                                          <div className="w-50">{`(${orderDetail.color} - ${orderDetail.size} x ${orderDetail.quantity})`}</div>
                                        </div>
                                        <div
                                          className="ms-5 text-secondary btn btn-link"
                                          onClick={() => {
                                            setOrderDetailData(
                                              orders.orderDetailDtos
                                            );
                                            setSelectedOrder(orders);
                                            setIsShowOrderDetail(true);
                                          }}
                                        >
                                          xem thêm...{" "}
                                        </div>
                                      </>
                                    );
                                  else {
                                    return (
                                      <>
                                        <div className="mt-2 mb-0 d-flex justify-content-start">
                                          <div className="text-truncate w-50 text-start">{`${orderDetail.designName}`}</div>
                                          <div className="w-50">{`(${orderDetail.color} - ${orderDetail.size} x ${orderDetail.quantity})`}</div>
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                            </div>
                          </td>
                          <td className="align-middle">{`${new Date(
                            orders.createdDate
                          ).getDate()}-${
                            new Date(orders.createdDate).getMonth() + 1
                          }-${new Date(orders.createdDate).getFullYear()}`}</td>
                          <td className="align-middle">
                            {numberWithCommas(orders.totalBill)}{" "}
                          </td>
                          <td className="align-middle">
                            {" "}
                            {orders.countItem} {"sản phẩm"}
                          </td>
                          <td className=" align-middle align-center">
                            {hanleOrderStatus(orders) === "Đã thanh toán" && (
                              <div className="badge bg-success p-1 ">
                                {hanleOrderStatus(orders)}
                              </div>
                            )}
                            {hanleOrderStatus(orders) === "Đã hủy đơn" && (
                              <div className="badge bg-secondary p-1 ">
                                {hanleOrderStatus(orders)}
                              </div>
                            )}
                            {hanleOrderStatus(orders) === "Chưa thanh toán" && (
                              <div className="badge bg-warning p-1 ">
                                {hanleOrderStatus(orders)}
                              </div>
                            )}
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-link"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Xem chi tiết đơn hàng"
                              onClick={() => {
                                setOrderDetailData(orders.orderDetailDtos);
                                setSelectedOrder(orders);
                                setIsShowOrderDetail(true);
                              }}
                            >
                              <p className="m-0">
                                Chi tiết
                                <i className="uil uil-arrow-right"></i>
                              </p>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="row">
            {Math.ceil(myOrdersResponse.elements / filter.pageSize) <= 1 ||
            isShowOrderDetail ? (
              <></>
            ) : (
              <div className="d-flex justify-content-center">
                <PaginationComponent
                  total={Math.ceil(myOrdersResponse.elements / filter.pageSize)}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <h4 className="table bg-white shadow rounded ">
          <p className="p-5 text-center">Không tìm thấy đơn hàng</p>
        </h4>
      )}
    </>
  );
}
