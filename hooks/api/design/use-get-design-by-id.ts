import { getDesignById } from "@/services/design";
import { useQuery } from "react-query";

const useGetDesignById = (designId: number) => {
  return useQuery(["designedProduct", designId], async () => {
    return await getDesignById(designId);
  });
};

export default useGetDesignById;
