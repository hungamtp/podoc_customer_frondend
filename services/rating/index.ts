import { API } from "@/api-client/axios";
import { GetAllRatingDto } from "./dto";

export interface Filter {
    pageSize: number;
    pageNumber: number;
  }

export const getAllRating = async (id: string, filter?: Filter) => {
    const pageNumber = 1;
    const pageSize = 10;
    const query = new URLSearchParams({
      page: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
    });
    const { data } = await API.get<GetAllRatingDto>(
      `rating/${id}?${query.toString()}`
    );
    return data;
  };