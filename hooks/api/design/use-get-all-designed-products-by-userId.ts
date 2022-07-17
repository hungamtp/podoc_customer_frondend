import { GetAllDesignFilter, getAllMyDesign } from "@/services/design";
import { useQuery } from "react-query";

const useGetAllDesignsByUserId = (filter: GetAllDesignFilter) => {
  return useQuery(["allDesignedProduct", filter], async () => {
    return await getAllMyDesign(filter);
  });
};

export default useGetAllDesignsByUserId;
