import { getBluprintFromProduct } from "@/services/design";
import { useQuery } from "react-query";

const useGetBlueprintByDesignId = (designId: string) => {
  return useQuery(["desinged-blueprint", designId], async () => {
    return await getBluprintFromProduct(designId);
  });
};

export default useGetBlueprintByDesignId;
