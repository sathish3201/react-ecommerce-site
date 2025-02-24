import axios from "axios"

const baseurl= "http://127.0.0.1:80/api";
const user_role = localStorage.getItem("user_role")
const refreshToken= async() =>{
    try{
        const response = await axios.post(`${baseurl}/token/refresh`,{
            refresh: user_role.refresh_token,
        });
        user_role.access_token = response.data.access;
        return user_role.access_token;

    }catch(error){
        console.log("error in refreshing token: ", error);
        return null;
    }
}
// axios instance
const axiosInstance = axios.create({
    baseURL : baseurl,
    headers : {
        "Content-Type": "application/json"
    },
});

axiosInstance.interceptors.request.use(async(config) => {
    let token = user_role.access_token;
    if(!token){
        token = await refreshToken();
    }
    if(token){
        config.headers["Authorization"]=`Bearer ${token}`;
    }
    return config;
}, (error) =>{
    return Promise.reject(error);
});
export default axiosInstance;
