import React from "react";
import ImageUploading from "react-images-uploading";
import { fabric } from "fabric";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setControlData } from "@/redux/slices/designControl";
import { DesignState } from "@/models/design";

export interface UploadImageTableProps {
  addNewRect: (imageSrc: string) => void;
}

export function UploadImageTable(props: UploadImageTableProps) {
  const { addNewRect } = props;
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const designControlData = useAppSelector((state) => state.designControl);
  const controlData = designControlData.controlData;
  const dispatch = useAppDispatch();
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
    const imgElement = document.getElementById(
      "upload-image"
    ) as HTMLImageElement;
    addNewRect(imageList[0].data_url);
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
            <>
              <div
                className="add-design-button d-flex"
                onClick={() =>
                  dispatch(
                    setControlData({ isChooseImage: true, isSetImage: true })
                  )
                }
              >
                <i className="bi bi-plus h3 m-1"></i>
                <div className="px-4">
                  <p className="h6 mb-0 text-start">Thêm thiết kế</p>
                  <p className="mb-0">
                    Kích thước vùng in 4500x5100 px (300DPI)
                  </p>
                </div>
              </div>
            </>
            {/* {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  id="upload-image"
                  src={image["data_url"]}
                  alt=""
                  width="100"
                />
                <div className="image-item__btn-wrapper"></div>
              </div>
            ))} */}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
