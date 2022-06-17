/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import useCreateBlueprintByProduct from "@/hooks/api/design/use-create-designed-product";
import { DesignedProductDto } from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { useRouter } from "next/router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import * as yup from "yup";
import { useAppSelector } from "../hooks/reduxHook";

export interface ICreateDesignedProductFormProps {
  handleCloseDialog: () => void;
}

type FormAddDesignInfo = {
  name: string;
  designedPrice: number;
  description: string;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Tên thiết kế cần ít nhất 1 kí tự")
    .max(26, "Tên thiết kế tối đa 50 kí tự")
    .required("Tên thiết kế không được để trống"),
  designedPrice: yup
    .number()
    .min(0, "Giá thiết kế tối thiểu 0 đồng")
    .required("Giá của mẫu thiết kế không được để trống"),
  description: yup.string().max(100, "Description tối đa 100 kí tự"),
});

function b64toBlob(dataURI: string) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

export default function CreateDesignedProductForm(
  props: ICreateDesignedProductFormProps
) {
  const { handleCloseDialog } = props;
  const theme = useTheme();
  const previews = useAppSelector((state) => state.previews);
  const blueprints = useAppSelector((state) => state.blueprintsData.blueprints);
  const [images, setImages] = React.useState<ImageListType>();
  const colors = useAppSelector((state) => state.blueprintsData.colors);
  console.log(colors, "colorrr");
  const router = useRouter();

  const defaultValues: FormAddDesignInfo = {
    name: "",
    designedPrice: 0,
    description: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAddDesignInfo>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [colorsList, setColorsList] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof colorsList>) => {
    const {
      target: { value },
    } = event;
    setColorsList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const maxNumber = 69;
  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const onUploadImage = (data: {
    name: string;
    designedPrice: number;
    description: string;
  }) => {
    if (images !== null) {
      const imageList = [] as { image: string; position: string }[];
      previews.map((image) => {
        const file = b64toBlob(image.imageSrc);
        const imageRef = ref(
          storage,
          `images/${data.name + "-" + image.position}`
        );

        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const position = url.split("%2F")[1].split("-")[1].split("?")[0];
            imageList.push({ image: url, position: position });
            const submitBlueprint = blueprints.map((blueprint) => {
              if (blueprint.designInfos) return blueprint;
              return { ...blueprint, designInfos: [] };
            });
            if (imageList.length === previews.length) {
              const submitData = {
                ...data,
                colors: colors,
                imagePreviews: imageList,
                bluePrintDtos: submitBlueprint,
              } as DesignedProductDto;

              addDesignedProduct(submitData);
            }
          });
        });
      });
    }
  };

  const productId = router.asPath.split("id=")[1];

  const { mutate: addDesignedProduct, error } = useCreateBlueprintByProduct(
    Number(productId),
    handleCloseDialog
  );

  const onSubmit: SubmitHandler<FormAddDesignInfo> = (data) => {
    onUploadImage(data);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Tên thiết kế
                </label>

                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="John"
                      aria-label="John"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-fullname"
                >
                  Màu áo
                </label>
                <div className="col-sm-10">
                  <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                    <Select
                      multiple
                      displayEmpty
                      value={colorsList}
                      onChange={handleChange}
                      variant="standard"
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>{colors[0]}</em>;
                        }

                        return selected.map((color) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={color}
                            width={22}
                            height={22}
                            className="rounded-circle border"
                            src={
                              "https://images.printify.com/5853fec7ce46f30f8328200a"
                            }
                            style={{ backgroundColor: color }}
                            alt={color}
                          />
                        ));
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        <em>{colors[0]}</em>
                      </MenuItem>
                      {colors.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, colorsList, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-icon-default-company"
                >
                  Mô tả
                </label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="ACME Inc."
                      aria-label="ACME Inc."
                      aria-describedby="basic-icon-default-company2"
                      {...register("description")}
                    />
                  </div>
                  {errors.description && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    color="primary"
                    type="submit"
                  >
                    Tạo
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseDialog}
                    autoFocus
                    type="button"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
