import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
export interface IRatingSuccessProps {
  isOpenSuccessRating: boolean;
  setIsOpenSuccessRating: (isOpen: boolean) => void;
}

const RatingSuccess = ({
  isOpenSuccessRating,
  setIsOpenSuccessRating,
}: IRatingSuccessProps) => {
  return (
    <>
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
    </>
  );
};

export default React.memo(RatingSuccess);
