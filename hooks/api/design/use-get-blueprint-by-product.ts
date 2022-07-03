import { getBluprintFromProduct } from "@/services/design";
import { useQuery } from "react-query";

const useGetBlueprintByProduct = (productId: string) => {
  return useQuery(["raw-blueprint", productId], async () => {
    return await getBluprintFromProduct(productId);
  });
};

export default useGetBlueprintByProduct;
