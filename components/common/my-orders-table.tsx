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

type Props = {
  myOrdersResponse: GetAllMyOrdersDto;
  isLoading: boolean;
  setFilter: (filter: Filter) => void;
  filter: Filter;
  handleFilter: (criteria: string) => void;
  criteria: string;
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
    label: "Đơn hàng đang xử lý",
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
  const { mutate: payOrder } = usePayUnpaidOrder();
  const { mutate: getOrderDetail } = useGetOrderDetailByOrderId();
  const { mutate: deleteOrder } = useDeleteOrder();
  const [isShowOrderDetail, setIsShowOrderDetail] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState<OrderDetailDto[]>();
  const [selectedOrderId, setSelectedOrderId] = useState<string>();

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
              {orderDetailData && selectedOrderId && (
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
                                    {order.rated == false &&
                                      order.status === "DONE" && (
                                        <div
                                          className="d-flex align-items-center mt-1  hoverButton text-center p-2"
                                          onClick={() => {
                                            handleOpenDialog(
                                              order.designId,
                                              order.id
                                            );
                                          }}
                                        >
                                          Đánh giá
                                        </div>
                                      )}
                                    <div
                                      className="d-flex align-items-center mt-1  hoverButton text-center p-2"
                                      onClick={() =>
                                        router.push(
                                          `/designs/${order.designId}`
                                        )
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
                      <th scope="col" className="border-bottom align-middle">
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
                        className="border-bottom align-middle"
                        style={{ width: "100px", textAlign: "center" }}
                      >
                        Hành động
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
                          <td className="align-middle">
                            <div style={{ minWidth: "200px", width: "220px" }}>
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
                                        <p className="mt-2 text-truncate">{`${orderDetail.designName} (${orderDetail.color} - ${orderDetail.size} x ${orderDetail.quantity})`}</p>
                                        <div
                                          className="mt-2 ms-5 text-secondary btn btn-link text-secondary"
                                          onClick={() => {
                                            getOrderDetail(orders.orderId, {
                                              onSuccess: (data) => {
                                                setOrderDetailData(data);
                                                setIsShowOrderDetail(true);
                                                setSelectedOrderId(
                                                  orders.orderId
                                                );
                                              },
                                            });
                                          }}
                                        >
                                          xem thêm...{" "}
                                        </div>
                                      </>
                                    );
                                  else {
                                    return (
                                      <>
                                        <div className="mt-2">{`${orderDetail.designName} (${orderDetail.color} - ${orderDetail.size} x ${orderDetail.quantity})`}</div>
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
                          <td className="align-middle">
                            {(!orders.isPaid || orders.canceled) && (
                              <div className="dropdown ">
                                <button
                                  type="button"
                                  className="btn dropdown-toggle d-flex align-items-center m-0 hoverButton"
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
                                      handleSubmit(0, orders.orderId)
                                    }
                                    className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                                  >
                                    <img
                                      className="me-1 rounded"
                                      src="asset/images/momologo.svg"
                                      width="25"
                                      alt="momo"
                                    />
                                    MOMO
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleSubmit(1, orders.orderId)
                                    }
                                    className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                                  >
                                    <img
                                      className="me-1 rounded"
                                      src="asset/images/zalopay.png"
                                      width="25"
                                      alt="momo"
                                    />
                                    Zalo
                                  </div>
                                </div>
                              </div>
                            )}
                            {orders.canCancel && orders.isPaid && (
                              <button
                                className="btn d-flex align-items-center m-0 hoverButton text-dark"
                                onClick={() => deleteOrder(orders.orderId)}
                              >
                                <i className="bi bi-x-square text-danger me-2"></i>
                                <p className="m-0">Hủy đơn</p>
                              </button>
                            )}
                            {!orders.canCancel && orders.isPaid && (
                              <button
                                className="btn d-flex align-items-center m-0 hoverButton text-dark"
                                onClick={() => deleteOrder(orders.orderId)}
                              >
                                <i className="bi bi-bag-heart text-success me-2"></i>
                                <p className="m-0">Mua lại</p>
                              </button>
                            )}
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-link"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Xem chi tiết đơn hàng"
                              onClick={() => {
                                getOrderDetail(orders.orderId, {
                                  onSuccess: (data) => {
                                    setOrderDetailData(data);
                                    setIsShowOrderDetail(true);
                                    setSelectedOrderId(orders.orderId);
                                  },
                                });
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
