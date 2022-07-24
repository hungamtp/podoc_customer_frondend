import { useQuery } from "react-query";
import { CartDetailDTO } from "@/services/type.dto";
import { API } from "@/api-client/axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { setCart } from "@/redux/slices/cart";

const UseCart = () => {
  const dispatch = useAppDispatch();
  return useQuery(["Cart"], async () => {
    return await getCart();
  } , 
  {
    onSuccess :(data) =>{
      dispatch(setCart(data))
    },
    onError: (error: any) => {
      console.log("error cart")
       dispatch(setCart([]))
    },
  });
};

export const getCart = async () => {
  const data = await API.get<CartDetailDTO[]>(`/cart`);
  return data.data;
};

export default UseCart;
