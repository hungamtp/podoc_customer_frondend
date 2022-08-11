import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Image from "next/image";
import * as React from "react";
export interface IUpdateImageSuccessProps {
  content: string;
}

export default function UpdateImageSuccess({
  content,
}: IUpdateImageSuccessProps) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            <div>{content}</div>
            <div className=" d-flex justify-content-center">
              <button
                className="btn btn-primary ps-4 pe-4"
                onClick={handleClose}
              >
                Đóng
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
