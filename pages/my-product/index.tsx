import { MainLayout } from "@/components/layouts";
import useGetAllDesignsByUserId from "@/hooks/api/design/use-get-all-designed-products-by-userId";
import { RawProductFilter } from "@/hooks/api/use-get-all-product-raw";
import { makeStyles } from "@material-ui/core";
import { Checkbox } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { numberWithCommas } from "helper/number-util";
import * as React from "react";
import EditDesign from "../edit-design";
export interface IMyDesinedProductProps {}
export default function MyDesinedProduct(props: IMyDesinedProductProps) {
  const [filter, setFilter] = React.useState<RawProductFilter>({
    pageNumber: 0,
    pageSize: 9,
    sort: "",
  });
  const { data: response, isLoading } = useGetAllDesignsByUserId(filter);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && response) {
      const newSelecteds = response?.content.map((design) => design.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    const id = Number(name);
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  return (
    <>
      <section className="bg-invoice bg-light">
        <div className="container">
          <div className="row mt-5 pt-4 pt-sm-0 justify-content-center">
            <div className="d-flex justify-content-between pb-4">
              <p className="h2">Sản phẩm của tôi</p>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card shadow rounded border-0 mb-4">
                <div className="card-body">
                  <div className="invoice-middle py-4">
                    <div className="row mb-0">
                      <div className="row">
                        <div className="col-md-12"></div>
                      </div>
                      <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                width: 100,
                                color: "text.primary",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            ></TableCell>
                            <TableCell
                              sx={{
                                width: 100,
                                color: "text.primary",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              Hình ảnh
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 100,
                                color: "text.primary",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              Tên
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 100,
                                color: "text.primary",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              Giá tiền(vnđ)
                            </TableCell>
                            <TableCell
                              sx={{
                                width: 100,
                                color: "text.primary",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              Trạng thái
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {response?.content.map((row, index) => {
                            return (
                              <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isSelected(row.id)}
                                tabIndex={-1}
                                key={row.id}
                                selected={isSelected(row.id)}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isSelected(row.id)}
                                    inputProps={{
                                      "aria-labelledby": `enhanced-table-checkbox-${index}`,
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.imagePreviews[0].image}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.name}
                                </TableCell>

                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {numberWithCommas(row.price)}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="left">
                                  {row.publish
                                    ? "Đã công khai"
                                    : "Chưa công khai"}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
MyDesinedProduct.Layout = MainLayout;
