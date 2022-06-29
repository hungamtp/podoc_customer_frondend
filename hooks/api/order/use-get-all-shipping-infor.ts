import { getAllShippingInfos } from "@/services/order";
import { useQuery } from "react-query";

const useGetAllShippingInfo = () => {
  return useQuery(["allShippingInfo"], async () => {
    return await getAllShippingInfos();
  });
};

export default useGetAllShippingInfo;
