import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@mui/material/Pagination";
import { Filter } from "@/services/design";
import { RawProductFilter } from "@/hooks/api/use-get-all-product-raw";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  palette: {
    primary: {
      main: "blue",
    },
  },
}));

export interface IPaginationComponent {
  total: number | undefined;
  filter: RawProductFilter;
  setFilter: (value: React.SetStateAction<RawProductFilter>) => void;
}

function PaginationComponent({
  total = 0,
  filter,
  setFilter,
}: IPaginationComponent) {
  const handleOnchange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        shape="rounded"
        count={total}
        color="primary"
        variant="outlined"
        onChange={handleOnchange}
      />
    </div>
  );
}

export default PaginationComponent;
