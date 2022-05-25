import { ISuccessHttpResponse } from '@/models/success_http_response.interface';
import { IUser } from '@/models/user';

export interface GetAccountsResponse extends ISuccessHttpResponse {
	data: { data: IUser[]; totalPage: number };
}

export interface GetAccountResponse extends ISuccessHttpResponse {
	data: IUser;
}

export interface GetAccountsByCampaignIdResponse extends ISuccessHttpResponse {
	data: IUser[];
}
