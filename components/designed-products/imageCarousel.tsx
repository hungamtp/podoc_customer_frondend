import { Skeleton } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";

export interface IImageCarouselProps {
  renderedImagesList: { image: string; position: string; color: string }[];
}

export default function ImageCarousel({
  renderedImagesList,
}: IImageCarouselProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  return (
    <div>
      <div className="tiny-single-item">
        <div className="tiny-slide">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {renderedImagesList.map((image, index) => {
                return (
                  <div
                    className={`carousel-item ${index == 0 && "active"}`}
                    key={image.position}
                  >
                    {" "}
                    <div className="d-block">
                      {}
                      <Image
                        src={image.image}
                        width={3000}
                        height={3000}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="/asset/images/image_default/BLANK+grey+placeholder+-+light.jpg"
                        alt="productImage"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              className="carousel-control-prev h-full "
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <div>
                <span
                  className="bi bi-caret-left text-secondary h4"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </div>
            </a>
            <a
              className="carousel-control-next h-full "
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <div>
                <span
                  className="bi bi-caret-right text-secondary h4"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
