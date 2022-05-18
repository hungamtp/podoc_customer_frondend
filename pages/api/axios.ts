import axios from "axios";
import { url } from "inspector";
const BASE_URL  =true ? "localhost:3001/" : "localhost:8080/"
import { ResponseLogin } from "./type";


export async function logIn(email :string , password : string) : Promise<ResponseLogin> {
    const {data} = await axios.get("login" ,{
        method : "POST",
        data :{
            email ,
            password

        }
    })
    return data.response;
}