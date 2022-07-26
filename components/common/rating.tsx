/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import useRating from "@/hooks/api/rating/use-rating";
import { Filter } from "@/services/rating";

export interface IUserRatingProps {
  id: string;
}

export default function UserRating(props: IUserRatingProps) {
  const { id } = props;
  const [filter, setFilter] = React.useState<Filter>({
    pageNumber: 0,
    pageSize: 10,
  });

  const { data: ratingData, isLoading: isLoading } = useRating(id, filter);

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <ul className="media-list list-unstyled mb-0">
            {!isLoading &&
              ratingData &&
              ratingData.data.map((ratingData) => (
                <li key={ratingData.user} className="mt-4">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <a className="pe-3">
                        <img
                          src={ratingData.userAvatar}
                          className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                          alt="img"
                        />
                      </a>
                      <div className="flex-1 commentor-detail">
                        <h6 className="mb-0">
                          <a className="text-dark media-heading">
                            {ratingData.user}
                          </a>
                        </h6>
                        <small className="text-muted">{ratingData.date}</small>
                      </div>
                    </div>
                    <ul className="list-unstyled mb-0">
                      <Rating
                        name="size-small"
                        size="medium"
                        value={ratingData.ratingStar}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
                        }
                      />
                    </ul>
                  </div>
                  <div className="mt-3">
                    <p className="text-muted fst-italic p-2 bg-light rounded">
                      {ratingData.comment}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {/*end col*/}
      </div>
    </>
  );
}
