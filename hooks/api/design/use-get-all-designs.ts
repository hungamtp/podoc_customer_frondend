import { Filter, getAllDesignedProducts } from "@/services/design";
import { useQuery } from "react-query";

const useGetAllDesigns = (filter: Filter) => {
  return useQuery(["allDesignedProduct", filter], async () => {
    return await getAllDesignedProducts(filter);
  });
};

export default useGetAllDesigns;
