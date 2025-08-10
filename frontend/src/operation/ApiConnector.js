import axios from "axios";
import { BACKEND_URL } from "./Api";

export const axiosInstance = axios.create({
    baseURL : BACKEND_URL
})

export const ApiConnector = async ({method,url,body,params,headers})  => {
    try{
        const config = {
            method,
            url,
            data : body || undefined,
            headers : headers || undefined,
            params  : params || undefined
        };

        const response = await axiosInstance(config);
        return response;
    }  
    catch(e){
        console.error("API call failed : ",e);
        throw e;
    }
}

