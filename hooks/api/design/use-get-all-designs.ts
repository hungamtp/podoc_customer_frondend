import { getAllDesignedProducts, GetAllDesignFilter } from "@/services/design";
import { useQuery } from "react-query";

const useGetAllDesigns = (filter: GetAllDesignFilter) => {
  return useQuery(["allDesignedProduct", filter], async () => {
    return await getAllDesignedProducts(filter);
  });
};

export default useGetAllDesigns;
