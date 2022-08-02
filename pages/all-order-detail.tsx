/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import CommentProduct from '@/components/common/comment';
import useAllOrderDetail from '@/hooks/api/order/use-all-order-detail';
import { GetAllOrderDetailDto } from '@/services/order/dto';
import { Dialog, DialogContent } from '@material-ui/core';
import { numberWithCommas } from 'helper/number-util';
import Image from 'next/image';
import * as React from 'react';

export interface IAllOrderDetailProps {
  allOrdersResponse: GetAllOrderDetailDto;
  isLoading: boolean;
}

export default function AllOrderDetail(props: IAllOrderDetailProps) {
  const { allOrdersResponse, isLoading } = props;
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [designId, setDesignId] = React.useState('');
  const [orderId, setOrderId] = React.useState('');
  const [isOpenSuccessRating, setIsOpenSuccessRating] = React.useState(false);

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
                <button className="btn btn-primary ps-4 pe-4" onClick={() => setIsOpenSuccessRating(false)}>
                  Đóng
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                    Thông tin
                  </th>
                  <th scope="col" className="border-bottom">
                    Ngày tạo
                  </th>
                  <th scope="col" className="border-bottom" style={{ minWidth: '20px' }}>
                    Tổng giá(VND)
                  </th>
                  <th scope="col" className="border-bottom" style={{ minWidth: '20px' }}>
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  allOrdersResponse &&
                  allOrdersResponse.data.map(order => (
                    <tr key={order.id}>
                      <td>
                        <img className="border-secondary" src={order.designImage} width={100} height={70} />
                      </td>
                      <th>
                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                          <li className="d-flex">
                            <div style={{ fontWeight: 'normal' }}>Tên : </div>
                            <div>{order.designName}</div>
                          </li>
                          <li className="d-flex">
                            <div style={{ fontWeight: 'normal' }}>Nhà in : </div>
                            <div>{order.provider}</div>
                          </li>
                          <li>
                            {order.rated == false && (
                              <button
                                type="button"
                                className="btn btn-success me-2"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                onClick={() => {
                                  handleOpenDialog(order.designId, order.id);
                                }}
                              >
                                Đánh giá
                              </button>
                            )}
                            <button className="btn-success btn">Mua lại</button>
                          </li>
                        </ul>
                      </th>
                      <td>
                        <div>Size : {order.size}</div>
                        <div>Màu : {order.color}</div>
                        <div>Số lượng : {order.quantity}</div>
                      </td>
                      <td>{`${new Date(order.date).getDate()}-${new Date(order.date).getMonth()}-${new Date(
                        order.date
                      ).getFullYear()}`}</td>
                      <td>{numberWithCommas(order.price)}</td>
                      <td>
                        {order.status === 'DONE' ? (
                          <div className="badge bg-success mb-3 p-1">{order.status}</div>
                        ) : (
                          <div className="badge bg-warning mb-3 p-1">{order.status}</div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 style={{ display: 'flex', justifyContent: 'space-around' }}>Chưa có đơn đặt hàng</h4>
        )}
      </>
    </>
  );
}
