import { API } from "@/api-client/axios";
import { GetBlueprintDto } from "./dto";

export const getBluprintFromProduct = async (productId: number) => {
  const { data } = await API.get<GetBlueprintDto>(
    `/product/design/${productId}`
  );
  return data.data;
};
