/* eslint-disable @next/next/no-img-element */
import MyOrdersTable from "@/components/common/my-orders-table";
import { Account, MainLayout } from "@/components/layouts";
import useMyOrders from "@/hooks/api/order/use-my-orders";
import { Filter } from "@/services/order";
import { MyOrdersDto } from "@/services/order/dto";
import React, { useEffect, useState } from "react";

type Props = {};

const criteriaEnum = {
  ALL: "all",
  CANCELED: "cancel",
  UNPAID: "unpaid",
  PENDING: "pending",
};

export default function MyOrders() {
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 4,
  });
  const [criteria, setCriteria] = useState(criteriaEnum.ALL);
  console.log(filter, "filter");

  const { data: myOrdersResponse, isLoading: isLoading } = useMyOrders(filter);

  const handleFilter = (criteria: string) => {
    if (criteria === criteriaEnum.PENDING) {
      setFilter({
        pageNumber: 0,
        pageSize: 4,
        cancel: false,
        paid: true,
      });
      setCriteria(criteriaEnum.PENDING);
    } else if (criteria === criteriaEnum.CANCELED) {
      setFilter((filter) => {
        return {
          pageSize: 4,
          pageNumber: filter.pageNumber,
          cancel: true,
        };
      });
      setCriteria(criteriaEnum.CANCELED);
    } else if (criteria === criteriaEnum.UNPAID) {
      setFilter((filter) => {
        return {
          pageSize: 4,
          pageNumber: filter.pageNumber,
          paid: false,
        };
      });
      setCriteria(criteriaEnum.UNPAID);
    } else if (criteria === criteriaEnum.ALL) {
      setFilter((filter) => {
        return {
          pageSize: 4,
          pageNumber: filter.pageNumber,
        };
      });
      setCriteria(criteriaEnum.ALL);
    }
  };

  return (
    <>
      {myOrdersResponse && (
        <MyOrdersTable
          filter={filter}
          setFilter={setFilter}
          handleFilter={handleFilter}
          isLoading={isLoading}
          criteria={criteria}
          myOrdersResponse={myOrdersResponse}
        />
      )}
    </>
  );
}
MyOrders.Layout = Account;
