import Image from "next/image";
import * as React from "react";

export interface IImageCarouselProps {
  renderedImagesList: { image: string; position: string; color: string }[];
}

export default function ImageCarousel({
  renderedImagesList,
}: IImageCarouselProps) {
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

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
                      <Image
                        src={image.image}
                        width={3000}
                        height={3000}
                        objectFit="cover"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(3000, 3000)
                        )}`}
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
