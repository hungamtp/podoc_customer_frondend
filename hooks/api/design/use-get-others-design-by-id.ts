import { getOthersDesignById } from "@/services/design";
import { useQuery } from "react-query";

const useGetOthersDesignById = (designId: number) => {
  return useQuery(["designedProduct", designId], async () => {
    return await getOthersDesignById(designId);
  });
};

export default useGetOthersDesignById;
