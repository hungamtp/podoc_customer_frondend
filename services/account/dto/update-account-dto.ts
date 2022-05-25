import { ISuccessHttpResponse } from '@/models/success_http_response.interface';
import { IUser } from '@/models/user';

export interface UpdateAccountDto {
	userId: string;
	username?: string;
	password?: string;
	fullName?: string;
	phone?: string;
	role?: string;
	avatar?: string;
}

export interface UpdateUserResponse extends ISuccessHttpResponse {
	data: IUser;
}
