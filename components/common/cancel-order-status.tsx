import useDeleteOrder from "@/hooks/api/order/use-delete-order";
import { CancelOrderStatusDto } from "@/services/order/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
export interface ICancelOrderStatusProps {
  handleCloseDialog: () => void;
  orderId: string;
  setIsShowOrderDetail: (status: boolean) => void;
}

type FormCancelOrderStatus = {
  cancelReason: string;
};

const schema = yup.object().shape({
  cancelReason: yup
    .string()
    .trim()
    .min(10, "Lý do cần ít nhất 10 kí tự")
    .max(300, "Lý do tối đa 300 kí tự")
    .required("không được để trống lý do"),
});

export default function CancelOrderStatus(props: ICancelOrderStatusProps) {
  const { handleCloseDialog, orderId, setIsShowOrderDetail } = props;
  const {
    mutate: deleteOrder,
    isSuccess: isDeleteSuccess,
    isLoading: isProcessDelete,
  } = useDeleteOrder(handleCloseDialog);
  const defaultValues: FormCancelOrderStatus = {
    cancelReason: "",
  };
  const [finishLoading, setFinishLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCancelOrderStatus>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormCancelOrderStatus> = (data) => {
    const tmpData: CancelOrderStatusDto = {
      orderId: orderId,
      cancelReason: data.cancelReason,
    };
    setFinishLoading(false);
    deleteOrder(tmpData, {
      onSuccess: (data) => {
        //because data:any
        queryClient.invalidateQueries("MyOrders");
        queryClient.invalidateQueries("OrderDetail");
        setIsShowOrderDetail(false);
        handleCloseDialog();
        enqueueSnackbar("Hủy đơn hàng thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
        setFinishLoading(true);
      },
      onError: (error: any) => {
        if (error) {
          enqueueSnackbar(error.response?.data.errorMessage, {
            autoHideDuration: 9000,
            variant: "error",
          });
        }
      },
    });
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="d-flex justify-content-center">
            <Image
              src="/asset/images/logo_man.png"
              className="avatar avatar rounded-circle "
              width={150}
              height={150}
              objectFit="cover"
              alt="productImage"
            />
          </div>
          <div className="d-flex justify-content-center">
            <strong>Bạn có muốn hủy đơn hàng này không?</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-5 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Lý do hủy đơn
                </label>
                <div className="">
                  <div className="input-group input-group-merge">
                    <textarea
                      rows={3}
                      className="form-control"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("cancelReason")}
                    />
                  </div>
                  {errors.cancelReason && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.cancelReason.message}
                    </span>
                  )}
                </div>
              </div>
              <div className=" d-flex justify-content-center mt-2">
                <button
                  className="btn btn-primary ps-4 pe-4 me-3"
                  type="submit"
                >
                  {!finishLoading && !isDeleteSuccess && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Đồng ý
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ps-4 pe-4"
                  onClick={handleCloseDialog}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
