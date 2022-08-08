import { getDesignById } from "@/services/design";
import { useQuery } from "react-query";

const useGetDesignById = (designId: string) => {
  return useQuery(
    ["designedProduct"],
    async () => {
      return await getDesignById(designId);
    },
    { refetchOnWindowFocus: false }
  );
};

export default useGetDesignById;
