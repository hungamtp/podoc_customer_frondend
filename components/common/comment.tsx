import { yupResolver } from "@hookform/resolvers/yup";
import Rating from "@mui/material/Rating";
import * as React from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateRatingDto } from "@/services/rating/dto";
import useCreateRating from "@/hooks/api/rating/use-create-rating";
export interface ICommentProductProps {
  designId: string;
  handleCloseDialog: () => void;
}

const schema = yup.object().shape({
  comment: yup
    .string()
    .max(150, "bình luận tối đa 50 kí tự")
    .required("bình luận không được để trống"),
});

export default function CommentProduct(props: ICommentProductProps) {
  const { designId, handleCloseDialog } = props;
  const [value, setValue] = React.useState<number>(1);
  const { mutate: createRating } = useCreateRating(handleCloseDialog);
  const defaultValues: CreateRatingDto = {
    comment: "",
    ratingStar: 0,
    designId: "",
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
    };
    createRating(tmpData);
    console.log(tmpData, "asdasdsa");
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
                <label className="form-label">Your Review:</label>
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
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
          {/*end row*/}
        </form>
        {/*end form*/}
      </div>
    </>
  );
}
