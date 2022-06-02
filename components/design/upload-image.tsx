import React from "react";
import ImageUploading from "react-images-uploading";
import { fabric } from "fabric";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setControlData } from "@/redux/slices/designControl";

export interface ITableProps {
  addRect: (imgElement: string) => void;
}

export function UploadImage(props: ITableProps) {
  const { addRect } = props;
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
    const imgElement = document.getElementById(
      "upload-image"
    ) as HTMLImageElement;
    console.log(imageList[0].data_url, "urlll");
    addRect(imageList[0].data_url);
  };

  return (
    <div className="App">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <li
              onClick={onImageUpload}
              className="list-group-item px-4 py-3 mb-2 border h6 btn btn-light d-flex justify-content-start align-items-center"
            >
              <i className="bi bi-pc-display-horizontal me-4 h4 pt-1"></i>Máy
              tính
            </li>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
