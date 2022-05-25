import { ISuccessHttpResponse } from '@/models/success_http_response.interface';
import { IUser } from '@/models/user';

export interface CreateAccountDto {
	username: string;
	password: string;
	email?: string;
	phone?: string;
	roleId: string;
}

export interface CreateAccountResponse extends ISuccessHttpResponse {
	data: IUser;
}
