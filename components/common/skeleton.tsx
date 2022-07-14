/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

export default function Skeleton({}: Props) {
  return (
    <div className="container loading-skeleton">
      <div className="row">
        <div className="col">
          <div className="card">
            <img
              src="//placekitten.com/300/200"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">{`Some quick example text to build on the card title and make up the bulk of the card's content.`}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="//placebear.com/300/200"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">{`Some quick example text to build on the card title and make up the bulk of the card's content.`}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
