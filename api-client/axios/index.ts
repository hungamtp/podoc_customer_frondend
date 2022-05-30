import { store } from "@/redux/store";
import axios from "axios";
// import Cookies from "js-cookie";
// axios.defaults.baseURL = import.meta.env.BE_URL;
// import { store } from "../../app/store";
const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = store.getState().auth.token;

if (token) {
  axios.defaults.headers.common["Authorization"] = `${token}`;
}

export { API };
