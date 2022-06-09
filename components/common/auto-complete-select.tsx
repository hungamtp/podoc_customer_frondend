import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, UseFormReturn } from "react-hook-form";
export interface IAutoCompleteSelectProps {
  list: { label: string; value: string }[];
  handleChange: (data: any) => void;
}

export default function AutoCompleteSelect(props: IAutoCompleteSelectProps) {
  const { list, handleChange } = props;

  return (
    <div>
      <Autocomplete
        onChange={handleChange}
        disablePortal
        id="combo-box-demo"
        options={list}
        sx={{
          width: 400,
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        size="small"
        renderInput={(params) => <TextField variant="outlined" {...params} />}
      />
    </div>
  );
}
