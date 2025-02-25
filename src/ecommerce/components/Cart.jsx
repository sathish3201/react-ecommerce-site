import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";

const user_role = JSON.parse(localStorage.getItem("user_role"));
const product_items = JSON.parse(localStorage.getItem('product-items'))

const Cart = () => {
   
    const [cart, setCart] = useState(null);
    const navigate = useNavigate()
   
    
   console.log(user_role);

        // useEffect(()=>{
        //     axiosInstance.get(`/cart`,).then((response) =>{
        //         console.log(response)
        //     }
        // )
        // })

        useEffect(()=>{
            if(!user_role){
                navigate("/")
                return;
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
          localStorage.setItem('cart-items',JSON.stringify(cart))
        console.log(cart)
        //   console.log(product_items)
  return (

  <div className="cart-container">
    <h1>Cart</h1>

    <div className="cart-list">
        {
            
           !!cart &&  cart.map((item) => 
            
            (
                
                <div className="cart-item" key={item.id}>
                    <div className="item">{item.product}</div>
                    <div className="item-name">{item.quantity}</div>
                    <div className="item-expectedDelivery">(Expected Delivery within 7 days)</div>
                </div>
            ))
        }
    </div>
    <Link to="/checkout">
        <button className="item-btn">Next</button>
    </Link>
    
  
   
  </div>
  )
}

export default Cart
