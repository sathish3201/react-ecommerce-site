import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const user_role = JSON.parse(localStorage.getItem("user_role"))

const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";
const Orders = () => {
  const navigate = useNavigate()
 
  
  useEffect(()=>{
    if(!user_role){
      navigate('/')
    }
    const getCart= async(token)=>{
      try{
          const response = await axios.get(`${backendurl}/cart/`,
              {
                  headers : {
                      Authorization : `Bearer ${token}`,
                  },
              }
          );
        //  setCart(response.data)
          setCart(response.data.filter((data) => data.user == user_role.id))

      }catch(error){
          console.log(error)
      
      }
     
  }
  !!user_role && getCart(user_role?.access_token);
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Orders
