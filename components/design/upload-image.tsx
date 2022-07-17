import { storage } from "@/firebase/firebase";
import { setControlData } from "@/redux/slices/designControl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface ITableProps {
  addNewRect: (imageSrc: string, tmpSrc: string) => void;
}

export function UploadImage(props: ITableProps) {
  const { addNewRect } = props;
  const dispatch = useAppDispatch();
  const controlData = useAppSelector((state) => state.designControl);

  const maxNumber = 69;
  const [images, setImages] = React.useState<ImageListType>([]);
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    // data for submit
    dispatch(setControlData({ ...controlData, isLoadingImage: true }));

    setImages(imageList);
    onUploadImage(imageList);
  };

  const onUploadImage = (imageList: ImageListType) => {
    if (imageList !== null) {
      const file = imageList[0].file;
      const tmpSrc = imageList[0].data_url;
      const imageRef = ref(storage, `images/${file?.name}`);
      uploadBytes(imageRef, file || new Blob()).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(imageList[0], "sizeeee");
          addNewRect(url, tmpSrc);
        });
      });
    }
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
