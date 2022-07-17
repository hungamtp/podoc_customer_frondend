import { GetAllDesignFilter, getAllMyDesign } from "@/services/design";
import { useQuery } from "react-query";

const useGetAllMyDesign = (filter: GetAllDesignFilter) => {
  return useQuery(["allMyDesign", filter], async () => {
    return await getAllMyDesign(filter);
  });
};

export default useGetAllMyDesign;
