import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import AuthHoc from '../tools/AuthHoc';
import { useSelector } from 'react-redux';
import Item from './Item';




const Cart = ({user}) => {
  const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cartValues);
    const total_amount= useSelector((state)=> state.cart.total_price)
  return (

  <div className="cart-container">
    <div className="Back btn btn-outline-primary" onClick={()=>{navigate('/homepage')}}> # Back</div>
    <h1>Cart</h1>
    {!cart?.length? <h2> No items in Cart!!!</h2>: 
    <div className="card-deck">
      
        {
            
           !!cart &&  cart.map((item) => 
           <div className="card" key={item.product.id}>
            
               <Item  
                    product = {item.product}
                    quantity = {item.quantity}
               /> 
            
            </div>
            )
            
        }
        <Link to="/checkout">
  
            <button type="submit" className="btn btn-primary">Next:{total_amount}</button>

      </Link>
    </div>
    
     } 
  
   
  </div>
  )
}

export default AuthHoc(Cart)
