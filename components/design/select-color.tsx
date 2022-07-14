import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { setColors } from "@/redux/slices/selectedColors";
import { useAppDispatch } from "../hooks/reduxHook";
import { useRouter } from "next/router";
import useGetColorsByFactoryAndProductId from "@/hooks/api/design/use-get-colors-by-factoryId-productId";
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

  const [colorsList, setColorsList] = React.useState<string[]>([
    colors[0].image,
  ]);
  const dispatch = useAppDispatch();
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
        {colors && (
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
                    <img
                      key={colors[0].image}
                      width={30}
                      height={30}
                      className="rounded-circle border"
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
                  <img
                    key={color}
                    width={30}
                    height={30}
                    className="rounded-circle border"
                    src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
                    style={{
                      backgroundColor: color,
                      marginRight: "0.5rem",
                      opacity: "0.8",
                    }}
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
                  <img
                    key={color.name}
                    width={30}
                    height={30}
                    className="rounded-circle border"
                    src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
                    style={{ backgroundColor: color.image, opacity: "0.8" }}
                    alt={color.name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
    </div>
  );
}
