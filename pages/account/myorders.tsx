/* eslint-disable @next/next/no-img-element */
import MyOrdersTable from "@/components/common/my-orders-table";
import { Account, MainLayout } from "@/components/layouts";
import useMyOrders from "@/hooks/api/order/use-my-orders";
import { Filter } from "@/services/order";
import React from "react";

type Props = {};

export default function MyOrders() {
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });

  const { data: myOrdersResponse, isLoading: isLoading } = useMyOrders(filter);

  return (
    <>
      {myOrdersResponse && (
        <MyOrdersTable
          myOrdersResponse={myOrdersResponse}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
MyOrders.Layout = Account;
