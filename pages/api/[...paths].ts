import * as React from "react";
import httpProxy, { ProxyResCallback } from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

// type Data = {
// 	message: string;
// };

export const config = {
  api: {
    bodyParser: false, //không cần parse body nữa, để nguyên cho server handle
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    req.headers.cookie = "foo";

    //convert token to cookies
    const accessToken = "token";
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    //dont send cookies to origin server
    req.headers.cookie = "";

    (res as NextApiResponse)
      .status(200)
      .json({ message: "login successfully" });
    resolve(true);
    proxy.web(req, res, {
      target: "http://localhost:8080",
      changeOrigin: true, //req sẽ được forward qua target domain
      selfHandleResponse: false, //proxy sẽ handler res
    });
  });
}
