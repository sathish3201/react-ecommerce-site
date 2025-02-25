import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const cart = JSON.parse(localStorage.getItem('cart-items'));
const user_role = JSON.parse(localStorage.getItem('user_role'))
const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";
const Checkout = () => {
  const navigate = useNavigate()
  const  [isOrdered, setIsOrderd] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.get(`${backendurl}/orders/${id}/place-order/`,
          {
              headers : {
                  Authorization : `Bearer ${token}`,
              },
          }
      );
    //  setCart(response.data)
      // setTotalPrice(response.data.total_price)
      console.log(response.data)
  }catch(error){
      console.log(error)
  
  }
  }
  useEffect(()=>{
    if(!user_role){
      navigate("/")
  }
    const getCart= async(id,token)=>{
      try{
          const response = await axios.get(`${backendurl}/cart/${id}/checkout/`,
              {
                  headers : {
                      Authorization : `Bearer ${token}`,
                  },
              }
          );
        //  setCart(response.data)
          setTotalPrice(response.data.total_price)
          console.log(response.data)
      }catch(error){
          console.log(error)
      
      }
     
  }
  !!user_role && getCart(user_role?.id, user_role?.access_token);
  },[])


  return (
    <div className="checkout-container">
      { isOrdered ?
      <>
       <h3> Order placed Successfully.</h3> 
      <Link to="/homepage">Shop more</Link>
      </>
      :
       (
        <>
        <div className="">
          <div className="custom-row">
            <h4>Order Review</h4>
              <span> items in cart</span>
          </div>
          <div className="total_price">{totalPrice}</div>
        </div>
        <div className="">
          {isOrdered ? (<Link to="/orders" > GO TO ORDERS</Link>) : "place Order" }
        </div>
        </>
       )

      }
    </div>
  )
}

export default Checkout
