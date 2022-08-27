import useCreateRating from "@/hooks/api/rating/use-create-rating";
import { CreateRatingDto } from "@/services/rating/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import Rating from "@mui/material/Rating";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
export interface ICommentProductProps {
  designId: string;
  orderDetailId: string;
  handleCloseDialog: () => void;
  setIsOpenSuccessRating: (isOpen: boolean) => void;
}

const schema = yup.object().shape({
  comment: yup
    .string()
    .trim()
    .min(5, "Bình luận cần ít nhất 5 kí tự")
    .max(150, "Bình luận tối đa 50 kí tự")
    .required("Bình luận không được để trống"),
});

export default function CommentProduct(props: ICommentProductProps) {
  const { designId, orderDetailId, handleCloseDialog, setIsOpenSuccessRating } =
    props;
  const [value, setValue] = React.useState<number>(1);
  const {
    mutate: createRating,
    isLoading: isLoadingRating,
    isSuccess: isSuccessRating,
  } = useCreateRating(handleCloseDialog);
  const defaultValues: CreateRatingDto = {
    comment: "",
    ratingStar: 0,
    designId: "",
    orderDetailId: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRatingDto>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateRatingDto> = (data) => {
    const tmpData = {
      ...data,
      ratingStar: value,
      designId: designId,
      orderDetailId: orderDetailId,
    };
    createRating(tmpData, {
      onSuccess: () => {
        setIsOpenSuccessRating(true);
      },
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <h6 className="small fw-bold">Your Rating:</h6>
            <Rating
              name="half-rating"
              value={value}
              size="large"
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(Number(newValue));
              }}
            />

            <div className=" mt-3">
              <div className="mb-2">
                <label className="form-label">Bình luận của bạn:</label>
                <div className="form-icon position-relative">
                  <i
                    data-feather="message-circle"
                    className="fea icon-sm icons"
                  />
                  <textarea
                    id="message"
                    placeholder="Bình luận của bạn..."
                    rows={5}
                    className="form-control ps-2"
                    required
                    defaultValue={""}
                    {...register("comment")}
                  />
                </div>
                {errors.comment && (
                  <p className="text-danger">{errors.comment.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseDialog}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu thay đổi
              {isLoadingRating && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          {/*end row*/}
        </form>

        {/*end form*/}
      </div>
    </>
  );
}
