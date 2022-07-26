  export interface RatingDto {
    comment: string;
    ratingStar: number;
    user: string;
    userAvatar: string;
    date: string;
  }

  export interface GetAllRatingDto {
    data: RatingDto[];
    page: number;
    elements: number;
  }