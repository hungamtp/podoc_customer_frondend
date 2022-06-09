import * as React from "react";

export interface ISingleInputProps {
  type: string;
  handleChange: (data: string) => void;
  unit?: string;
  defaultVal?: string;
}

export default function SingleInput(props: ISingleInputProps) {
  const { handleChange, type, unit, defaultVal } = props;
  const [value, setValue] = React.useState(defaultVal);

  React.useEffect(() => {
    setValue(defaultVal);
  }, [defaultVal]);

  return (
    <div>
      <div className="input-group">
        <input
          type={type}
          className="form-control"
          aria-label="Inches (with dot and two decimal places)"
          onChange={(e: any) => {
            setValue(e.target.value);
            handleChange(e.target.value);
          }}
          value={value}
        />
        {unit && <span className="input-group-text">{unit}</span>}
      </div>
    </div>
  );
}
