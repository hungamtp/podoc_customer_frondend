import { API } from "@/api-client/axios";
import axios from "axios";
import { SignUpDTO , SignUpResponse} from "./type.dto";

export const signup = async (requestData: SignUpDTO) => { 
  const { data } = await API.post<SignUpResponse>("/auth/register", requestData);
  return data.data;
};