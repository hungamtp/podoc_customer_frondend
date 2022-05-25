import * as React from "react";
import httpProxy, { ProxyResCallback } from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import { store } from "@/redux/store";

// type Data = {
// 	message: string;
// };

export const config = {
  api: {
    bodyParser: true, //không cần parse body nữa, để nguyên cho server handle
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    const handlerLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      const accessToken = store.getState().auth.token;
      console.log(req.headers, "headerss");
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        try {
          console.log(body, "bodyyy");
          //set access token vao cookie của client
          (res as NextApiResponse)
            .status(200)
            .json({ message: "login successfully", body: body });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
        }
        resolve(true);
      });
    };
    proxy.once("proxyRes", handlerLoginResponse);
    proxy.web(req, res, {
      target: "http://localhost:8080",
      changeOrigin: true, //req sẽ được forward qua target domain
      selfHandleResponse: true, //proxy sẽ handler res
    });
  });
}
