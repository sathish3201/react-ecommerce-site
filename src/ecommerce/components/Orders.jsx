import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const user_role = JSON.parse(localStorage.getItem("user_role"))
const Orders = () => {
  const navigate = useNavigate()
 
  useEffect(()=>{
    if(!user_role){
      navigate('/react-ecommerce-site/login')
    }
    const getCart= async(token)=>{
      try{
          const response = await axios.get(`${backendurl}/api/cart/`,
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
