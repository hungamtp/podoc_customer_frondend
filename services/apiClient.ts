import { API } from "@/api-client/axios";
import axios from "axios";
import { SignUpDTO , SignUpResponse , ProductHomePage , Best4DesignedProduct , LoginDto , LoginResponse} from "./type.dto";

export const signup = async (requestData: SignUpDTO) => { 
  const { data } = await API.post<SignUpResponse>("/auth/register", requestData);
  return data.data;
};

export const getHighestRateProduct = async () => { 
  const { data } = await API.get<Best4DesignedProduct>("/design/4highestDRateDesignedProduct");
  return data;
};


export const login = async (requestData: LoginDto) => {
  const { data } = await API.post<LoginResponse>("/auth/login", requestData);
  return data.data;
};

export const signInGoogle = async (requestData: LoginDto) => {
  const { data } = await API.post<LoginResponse>("/auth/login", requestData);
  return data.data;
};
