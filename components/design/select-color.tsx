import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { setColors } from "@/redux/slices/selectedColors";
import { useAppDispatch } from "../hooks/reduxHook";
export interface ISelectColorProps {}

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
const colors = ["white", "black", "red", "yellow"];
export default function SelectColor(props: ISelectColorProps) {
  const [colorsList, setColorsList] = React.useState<string[]>([]);
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
        <FormControl sx={{ mb: 1, width: 400 }}>
          <Select
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
                    key={colors[0]}
                    width={30}
                    height={30}
                    className="rounded-circle border"
                    src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
                    style={{ backgroundColor: colors[0], opacity: "0.8" }}
                    alt={colors[0]}
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
            {colors.map((name) => (
              <MenuItem
                key={name}
                value={name}
                className="d-flex justify-content-between"
              >
                <p className="m-0">{name}</p>
                <img
                  key={name}
                  width={30}
                  height={30}
                  className="rounded-circle border"
                  src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
                  style={{ backgroundColor: name, opacity: "0.8" }}
                  alt={name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
