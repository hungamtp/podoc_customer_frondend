import { getColorsByFactoryAndProductId } from "@/services/design";
import { useQuery } from "react-query";

const useGetColorsByFactoryAndProductId = (
  factoryId: number,
  productId: number
) => {
  return useQuery(["colors", productId, factoryId], async () => {
    return await getColorsByFactoryAndProductId(factoryId, productId);
  });
};

export default useGetColorsByFactoryAndProductId;
