import axios from "axios";
import { useSelector } from "react-redux"


const AxiosInstance=(token='') => {
    const getUrl=()=>{
        return process.env.VITE_BACKEND_URL === undefined || null ? "http://127.0.0.1:80/api" : process.env.VITE_BACKEND_URL;
    }
    console.log(getUrl())
    const axiosinstance=axios.create({
        baseURL : getUrl(),
        headers : {
            'Content-Type' :'application/json',
            Authorization : token? `Bearer ${token}`: '',
        },
    });
    return axiosinstance    
       
 }
    export default AxiosInstance;
    
