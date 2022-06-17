import { useQuery } from "react-query";
import { CartDetailDTO} from "@/services/type.dto";
import { API } from "@/api-client/axios";

const UseCart = () => {
  return useQuery(["Cart"], async () => {
    return await getCart();
  });
};

export const getCart = async () => {
  const data  = await API.get<  CartDetailDTO[] >(`/cart`);
  return data.data;
};

export default UseCart;
