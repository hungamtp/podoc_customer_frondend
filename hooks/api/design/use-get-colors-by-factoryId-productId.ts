import { getColorsByFactoryAndProductId } from "@/services/design";
import { useQuery } from "react-query";

const useGetColorsByFactoryAndProductId = (
  factoryId: string,
  productId: string
) => {
  return useQuery(
    ["colors", productId, factoryId],
    async () => {
      return await getColorsByFactoryAndProductId(factoryId, productId);
    },
    { enabled: !!factoryId && !!productId }
  );
};

export default useGetColorsByFactoryAndProductId;
