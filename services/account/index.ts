import {
  CreateAccountDto,
  CreateAccountResponse,
} from "./dto/create-account-dto";
import { UpdateAccountDto, UpdateUserResponse } from "./dto/update-account-dto";
import {
  GetAccountResponse,
  GetAccountsByCampaignIdResponse,
  GetAccountsResponse,
} from "./dto/get-account.dto";
import { API } from "@/api-client/axios";

interface Filter {
  pageSize?: number;
  pageNum?: number;
  sort?: string;
  fullName?: string;
  role?: string;
  username?: string;
  phone?: string;
  email?: string;
}

export const getAccounts = async (filter?: Filter) => {
  const pageNum = 0;
  const pageSize = 9;
  const query = new URLSearchParams({
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
    // search: `fullName:${filter?.fullName}&phone:${filter?.phone}&email:${filter?.email}`,
    search: `phone:${filter?.phone}`,

    sort: "usernameASC",
  });
  const { data } = await API.get<GetAccountsResponse>(
    `/user?${query.toString()}`
  );
  return data.data;
};

export const createAccount = async (requestData: CreateAccountDto) => {
  const { data } = await API.post<CreateAccountResponse>(
    "/auth/signup",
    requestData
  );
  return data;
};

export const updateRole = async (requestData: UpdateAccountDto) => {
  const { data } = await API.put<UpdateUserResponse>(
    `/user/${requestData.userId}?roleId=${requestData.role}`
  );
  return data;
};

export const updatePassword = async (requestData: UpdateAccountDto) => {
  const { data } = await API.post<UpdateUserResponse>(
    `/auth/changePassword`,
    requestData
  );
  console.log(data, "changePassworddddddddd");
  return data;
};

export const updateAccount = async (requestData: UpdateAccountDto) => {
  const { data } = await API.put<UpdateUserResponse>(
    `/user/update/${requestData.userId}`,
    requestData
  );
  return data;
};

export const getAccount = async (id: string) => {
  const { data } = await API.get<GetAccountsResponse>(
    `/user?pageNum=0&pageSize=10&sort=usernameASC&search=id:${id}`
  );
  return data.data;
};

export const getAccountById = async (id: string) => {
  const { data } = await API.get<GetAccountResponse>(`/user/${id}`);
  return data.data;
};

export const getAccountByCampaignId = async (id: string) => {
  const { data } = await API.get<GetAccountsByCampaignIdResponse>(
    `user/usersInCampaign/${id}`
  );
  return data.data;
};

export const getDonatorByCampaignId = async (id: string) => {
  const { data } = await API.get<GetAccountsByCampaignIdResponse>(
    `user/donatorInCampaign/${id}`
  );
  return data.data;
};

export const getAllDonators = async (filter?: Filter) => {
  const pageNum = 0;
  const pageSize = 9;
  const query = new URLSearchParams({
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
    // search: `fullName:${filter?.fullName}&phone:${filter?.phone}&email:${filter?.email}`,
    // search: `phone:${filter?.phone}`,
    search: "",

    sort: "usernameASC",
  });
  const { data } = await API.get<GetAccountsResponse>(
    `/user?${query.toString()}`
  );
  return data.data;
};
