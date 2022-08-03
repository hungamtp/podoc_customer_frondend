import { setColors } from "@/redux/slices/selectedColors";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
export interface ISelectColorProps {
  colors: {
    id: string;
    name: string;
    image: string;
  }[];
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
export default function SelectColor({ colors }: ISelectColorProps) {
  const router = useRouter();

  React.useEffect(() => {
    dispatch(setColors([colors[0].image]));
  }, [colors]);
  const selectedColorsRedux = useAppSelector((state) => state.selectedColors);

  const [colorsList, setColorsList] = React.useState<string[]>(
    selectedColorsRedux.length > 0 ? selectedColorsRedux : [colors[0].image]
  );
  const dispatch = useAppDispatch();
  const designControl = useAppSelector((state) => state.designControl);
  const controlData = designControl.controlData;
  const handleChange = (event: SelectChangeEvent<typeof colorsList>) => {
    const {
      target: { value },
    } = event;

    dispatch(setColors(typeof value === "string" ? value.split(",") : value));
    setColorsList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const maxNumber = 69;
  return (
    <div>
      <div className="d-flex flex-column">
        <label>Màu áo</label>
        {colors && !controlData.isLoadingImage && (
          <FormControl sx={{ mb: 1, width: 300 }}>
            <Select
              className="border px-2 rounded"
              multiple
              disableUnderline
              displayEmpty
              value={colorsList}
              onChange={handleChange}
              variant="standard"
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Image
                      className="rounded-circle border"
                      width={30}
                      height={30}
                      objectFit="cover"
                      key={colors[0].image}
                      src={
                        "https://images.printify.com/5853fec7ce46f30f8328200a"
                      }
                      style={{
                        backgroundColor: colors[0].image,
                        opacity: "0.8",
                      }}
                      alt={colors[0].name}
                    />
                  );
                }

                return selected.map((color) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <Image
                    key={color}
                    width={30}
                    height={30}
                    className="rounded-circle border"
                    src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
                    style={{ backgroundColor: color, opacity: "0.8" }}
                    alt={color}
                  />
                ));
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {colors.map((color) => (
                <MenuItem
                  key={color.name}
                  value={color.image}
                  className="d-flex justify-content-between"
                >
                  <p className="m-0">{color.name}</p>
                  <Image
                    className="rounded-circle border"
                    width={30}
                    height={30}
                    objectFit="cover"
                    key={color.image}
                    src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
                    style={{
                      backgroundColor: color.image,
                      opacity: "0.8",
                    }}
                    alt={color.name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {controlData.isLoadingImage && (
          <FormControl sx={{ mb: 1, width: 300 }}>
            <div className="d-flex border px-2 rounded">
              <p className="my-auto text-secondary">Đang tải hình</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                  margin: "0",
                  background: "none",
                  display: "block",
                  shapeRendering: "auto",
                }}
                width="50px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <rect x="17.5" y="42.5" width={15} height={15} fill="#bcbcbc">
                  <animate
                    attributeName="y"
                    repeatCount="indefinite"
                    dur="1.2195121951219512s"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    values="39.5;42.5;42.5"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-0.24390243902439024s"
                  />
                  <animate
                    attributeName="height"
                    repeatCount="indefinite"
                    dur="1.2195121951219512s"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    values="21;15;15"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-0.24390243902439024s"
                  />
                </rect>
                <rect x="42.5" y="42.5" width={15} height={15} fill="#bcbcbc">
                  <animate
                    attributeName="y"
                    repeatCount="indefinite"
                    dur="1.2195121951219512s"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    values="40.25;42.5;42.5"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-0.12195121951219512s"
                  />
                  <animate
                    attributeName="height"
                    repeatCount="indefinite"
                    dur="1.2195121951219512s"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    values="19.499999999999996;15;15"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                    begin="-0.12195121951219512s"
                  />
                </rect>
                <rect x="67.5" y="42.5" width={15} height={15} fill="#bcbcbc">
                  <animate
                    attributeName="y"
                    repeatCount="indefinite"
                    dur="1.2195121951219512s"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    values="40.25;42.5;42.5"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                  />
                  <animate
                    attributeName="height"
                    repeatCount="indefinite"
                    dur="1.2195121951219512s"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    values="19.499999999999996;15;15"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                  />
                </rect>
                {/* [ldio] generated by https://loading.io/ */}
              </svg>
            </div>
          </FormControl>
        )}
      </div>
    </div>
  );
}
