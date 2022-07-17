/* eslint-disable @next/next/no-img-element */
import Design from "@/components/common/design";
import PaginationComponent from "@/components/common/mui-pagination";
import { MainLayout } from "@/components/layouts";
import useGetAllMyDesign from "@/hooks/api/design/use-get-all-my-design";
import { GetAllDesignFilter } from "@/services/design";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function MyDesign({}: Props) {
  const [filter, setFilter] = useState<GetAllDesignFilter>({
    pageNumber: 0,
    pageSize: 9,
  });

  const { data: response, isLoading } = useGetAllMyDesign(filter);
  return (
    <>
      <div className="col-12">
        {response && response.content.length > 0 && (
          <div className="table-responsive bg-white shadow rounded">
            <table className="table mb-0 table-center">
              <thead>
                <tr>
                  <th
                    className="border-bottom text-start py-3"
                    style={{ minWidth: "300px" }}
                  >
                    Thiết kế
                  </th>
                  <th
                    className="border-bottom text-center py-3"
                    style={{ minWidth: "160px" }}
                  >
                    Giá
                  </th>
                  <th
                    className="border-bottom text-center py-3"
                    style={{ minWidth: "160px" }}
                  >
                    Trạng thái
                  </th>
                  <th
                    className="border-bottom text-center py-3"
                    style={{ minWidth: "160px" }}
                  >
                    Đặt hàng
                  </th>
                  <th
                    className="border-bottom text-end py-3 pe-4"
                    style={{ minWidth: "160px" }}
                  ></th>
                </tr>
              </thead>

              <tbody>
                {response.content.map((product) => {
                  return <Design key={product.id} product={product} />;
                })}
              </tbody>
            </table>

            {response.totalPages <= 1 ? (
              <></>
            ) : (
              <div className="d-flex justify-content-center">
                <PaginationComponent
                  total={response?.totalPages}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            )}
          </div>
        )}
        {!isLoading && response?.content.length === 0 && (
          <div className="d-flex justify-content-center">
            <p className="h5">
              Bạn chưa có thiết kế nào, hãy{" "}
              <Link href="/raw-products">
                <a className="text-success">nhấn vào đây</a>
              </Link>{" "}
              để tiến hành thiết kế
            </p>
          </div>
        )}
      </div>
    </>
  );
}

MyDesign.Layout = MainLayout;
