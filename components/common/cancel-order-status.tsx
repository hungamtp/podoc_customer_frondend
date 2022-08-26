import useCancelOrderDetail, {
  CancelOrderDetailDto,
} from "@/hooks/api/order/use-cancel-order-detail";
import useDeleteOrder from "@/hooks/api/order/use-delete-order";
import { CancelOrderStatusDto } from "@/services/order/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = [
  "Giao hàng chậm",
  "Tôi đặt nhầm sản phẩm muốn mua",
  "Đơn hàng tôi đặt bị trùng",
  "Tôi không liên lạc được với bên hỗ trợ sau khi đã đặt hàng",
  "Đợi lâu nhưng đơn hàng vẫn chưa được xử lý",
  "Tôi không muốn đặt sản phẩm này nữa",
  "Đơn hàng của tôi bị thiếu sản phẩm",
];
export interface ICancelOrderStatusProps {
  handleCloseDialog: () => void;
  orderDetailIdsList: string[];
}

type FormCancelOrderStatus = {
  cancelReason: string;
};

const schema = yup.object().shape({
  cancelReason: yup
    .string()
    .trim()
    .required("Lý do không được để trống")
    .min(10, "Lý do cần ít nhất 10 kí tự")
    .max(300, "Lý do tối đa 300 kí tự"),
});

export default function CancelOrderStatus(props: ICancelOrderStatusProps) {
  const { handleCloseDialog, orderDetailIdsList } = props;

  const {
    mutate: deleteOrderDetail,
    isSuccess: isDeleteOrderdetail,
    isLoading: isProcessDeleteorderDetail,
  } = useCancelOrderDetail(handleCloseDialog);
  const defaultValues: FormCancelOrderStatus = {
    cancelReason: "",
  };
  const [finishLoading, setFinishLoading] = useState(true);

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCancelOrderStatus>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (personName) {
      reset({ cancelReason: personName.toString() });
    }
  }, [personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [isAutoComplete, setIsAutoComplete] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FormCancelOrderStatus> = (data) => {
    const tmpOrderDetail: CancelOrderDetailDto = {
      orderDetailIds: orderDetailIdsList,
      cancelReason: data.cancelReason,
    };
    // setIsShowOrderDetail(false);
    setFinishLoading(false);
    deleteOrderDetail(tmpOrderDetail);
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
            <strong>Xin hãy cho chúng tôi biết lý do mà bạn hủy đơn</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                className="form-check-label"
                htmlFor="basic-icon-default-fullname"
              >
                Lý do hủy đơn
              </label>
              <div className="row mb-3">
                {
                  <FormControl sx={{ m: 1, width: 500 }}>
                    <Select
                      className="border px-2 rounded"
                      multiple
                      rows={3}
                      disableUnderline
                      displayEmpty
                      value={personName}
                      variant="standard"
                      onChange={handleChange}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              <Chip
                                key="Hãy chọn một lý do"
                                label="Hãy chọn một lý do"
                              />
                            </Box>
                          );
                        }
                        return (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        );
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                }
                <div>
                  <div className="form-check col-sm-5 ">
                    <input
                      className="form-check-input"
                      onChange={(e: any) => {
                        setIsAutoComplete(e.target.checked);
                        if (e.target.checked) {
                          setPersonName([]);
                        }
                      }}
                      checked={isAutoComplete}
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Lý do khác
                    </label>
                  </div>
                </div>

                <div>
                  <div
                    className={`input-group input-group-merge ${
                      !isAutoComplete && "d-none"
                    }`}
                  >
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
              <div className=" d-flex justify-content-center mt-2 ">
                <button
                  className="btn btn-primary ps-4 pe-4 me-3"
                  type="submit"
                >
                  {!finishLoading && !isDeleteOrderdetail && (
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
