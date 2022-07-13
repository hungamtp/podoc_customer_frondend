  import { API } from "@/api-client/axios";
import { getAccountByIdResponse } from "./dto";
  export const getAccountById = async (id: string) => {
    const { data } = await API.get<getAccountByIdResponse>(
      `/user/${id}`
    );
    return data;
  };