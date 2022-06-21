import {
  Filter,
  getAllDesignedProductsByUserId,
  GetAllDesignFilter,
} from "@/services/design";
import { useQuery } from "react-query";

const useGetAllDesignsByUserId = (filter: GetAllDesignFilter) => {
  return useQuery(["allDesignedProduct", filter], async () => {
    return await getAllDesignedProductsByUserId(filter);
  });
};

export default useGetAllDesignsByUserId;
