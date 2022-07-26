/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import CommentProduct from "@/components/common/comment";
import useAllOrderDetail from "@/hooks/api/order/use-all-order-detail";
import { GetAllOrderDetailDto } from "@/services/order/dto";
import { Dialog, DialogContent } from "@material-ui/core";
import { numberWithCommas } from "helper/number-util";
import * as React from "react";

export interface IAllOrderDetailProps {
  allOrdersResponse: GetAllOrderDetailDto;
  isLoading: boolean;
}

export default function AllOrderDetail(props: IAllOrderDetailProps) {
  const { allOrdersResponse, isLoading } = props;
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };
  return (
    <>
      <>
        {allOrdersResponse && allOrdersResponse.data.length > 0 ? (
          <div className="table-responsive bg-white shadow rounded">
            <table className="table mb-0 table-center table-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="border-bottom">
                    Hình ảnh
                  </th>
                  <th scope="col" className="border-bottom">
                    Thiết kế
                  </th>
                  <th scope="col" className="border-bottom">
                    Size
                  </th>
                  <th scope="col" className="border-bottom">
                    Màu
                  </th>
                  <th scope="col" className="border-bottom">
                    Ngày
                  </th>
                  <th
                    scope="col"
                    className="border-bottom"
                    style={{ minWidth: "20px" }}
                  >
                    Tổng giá(VND)
                  </th>
                  <th
                    scope="col"
                    className="border-bottom"
                    style={{ minWidth: "20px" }}
                  >
                    Số lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  allOrdersResponse &&
                  allOrdersResponse.data.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <img
                          className="border-secondary"
                          src={order.designImage}
                          width={100}
                          height={70}
                        />
                      </td>
                      <th>
                        <ul style={{ listStyleType: "none" }}>
                          <li>Tên : {order.designName}</li>
                          <li>Nhà in : {order.provider}</li>
                          <li>
                            <button
                              type="button"
                              className="btn btn-success me-2"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={handleOpenDialog}
                            >
                              Đánh giá
                            </button>
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
                                  handleCloseDialog={handleCloseDialog}
                                  designId={order.designId}
                                />
                              </DialogContent>
                            </Dialog>
                            {/* <div
                              className="modal fade mt-100"
                              id="exampleModal"
                              tabIndex={-1}
                              role="dialog"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <CommentProduct designId={order.designId} />
                            </div> */}
                            <button className="btn-success btn">Mua lại</button>
                          </li>
                        </ul>
                      </th>
                      <td>{order.size}</td>
                      <td>{order.color}</td>
                      <td>{order.date}</td>
                      <td>{numberWithCommas(order.price)}</td>
                      <td> {order.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
