import * as React from "react";
export interface ColorPicker {
  handleChange: (data: any) => void;
}

export default function ColorPicker(props: ColorPicker) {
  const { handleChange } = props;
  const [color, setColor] = React.useState("#FFFFFF");

  const onchange = (e: any) => {
    const value = e.target.value;
    setColor(value);
    handleChange(value);
  };

  return (
    <div className=" ">
      <input
        type="color"
        className="small-card"
        id="exampleColorInput"
        value={color}
        title="Choose your color"
        onChange={onchange}
      ></input>
    </div>
  );
}
