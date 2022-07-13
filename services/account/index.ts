  import { API } from "@/api-client/axios";
import { getAccountByIdResponse, UpdateAccountDto, UpdateAccountResponse } from "./dto";


  export const getAccountById = async (id: string) => {
    const { data } = await API.get<getAccountByIdResponse>(
      `/user/${id}`
    );
    return data;
  };

  export const updateAccount = async (requestData: UpdateAccountDto) => {
    const { data } = await API.put<UpdateAccountResponse>(
      `/user/update/${requestData.id}`,
      requestData
    );
    return data;
  };