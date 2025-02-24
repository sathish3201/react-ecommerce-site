import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const cart = JSON.parse(localStorage.getItem('cart-items'));
const user_role = JSON.parse(localStorage.getItem('user_role'))
const backendurl= "http://127.0.0.1:80"
const Checkout = () => {
  const navigate = useNavigate()
  const  [isOrdered, setIsOrderd] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await axios.post('http://127.0.0.1:80/api/auth/login/',{
            username,
            password
        });
       
        localStorage.setItem("user_role", JSON.stringify(response.data.user_role))
        console.log(response.data.user_role)
        // getProducts(response.data.user_role.access_token);
        //  console.log(JSON.parse(localStorage.getItem("user_role")))
        // redirect to product list page
        navigate('/homepage')

    }catch(error){
        if(error.response){
            setErrorMessage(error.response.data.detail || "Invalid Credentials")
        }else{
            setErrorMessage('Network Error' || error)
        }
    }
  }
  useEffect(()=>{
    if(!user_role){
      navigate("/react-ecommerce-site/login")
  }
    const getCart= async(id,token)=>{
      try{
          const response = await axios.get(`${backendurl}/api/cart/${id}/checkout/`,
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
