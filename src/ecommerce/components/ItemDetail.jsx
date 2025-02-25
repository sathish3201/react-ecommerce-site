import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import Cart from './Cart';

const products = JSON.parse(localStorage.getItem("products"));
const user_role = JSON.parse(localStorage.getItem("user_role"));

const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";

const getItemDetail=(id) => products.filter(item => item.id ===id)[0];


const ItemDetail = () => {
    backendurl= process?.env.BACKEND_URL;
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user_role){
            navigate('/')
            return;
        }
        
    },[])

    const param = useParams();
    const itemId = parseInt(param?.id);
    const item = !!itemId && !!user_role && getItemDetail(itemId);
    const [quantity,setQuantity] = useState(0);
   
    const [isAdded, setIsAdded] = useState(false);

    const addItemToCart= async(item, token) =>{
        try{
            const response =await axios.post(`${backendurl}/cart/`,item,
                {
                headers : {
                    Authorization : `Bearer ${token}`,
                    'Content-Type':'application/json',
                }
            }    
            );
            console.log(response);
           
        }catch(error){
            console.log(error)
        }
    }
  return (
   <div className="item-detail-container">
    <Link to="/homepage">&#8592; Back</Link>
    <div className="item-detail">
        <div className="item-detail-image">
            <img src={item.image} alt={"Item Image"} />
        </div>
        <div className="item-detail-info">
            <div className="item-brand">{item.brand}</div>
        </div>
        <div className="item-name">{item.name}</div>
        <div className="item-price">{item.price}</div>
        <div className="item-quantity">
        <span className='add' onClick={()=>{item.stock > (quantity+1)?setQuantity(quantity+1): quantity}}> + </span>&nbsp; {quantity} &nbsp;<span className='minus' onClick={()=>{ (quantity-1 > 0)?setQuantity(quantity-1): quantity}}> -</span>
        </div>
        <select name="" id="" className="item-size">
            <option value={"S"}>select Size(S)</option>
            <option value={"M"}>select Size(M)</option>
            <option value={"L"}>select Size(L)</option>
            <option value={"XL"}>select Size(XL)</option>
        </select>

        <button className="item-btn"
            disabled ={isAdded}
            onClick={()=>{
                console.log(user_role?.id)
                const cartItem = {
                    user:user_role?.id,
                    Product : item?.id,
                    quantity : quantity
                };

                 addItemToCart(cartItem ,user_role?.access_token);
                console.log(cartItem)
                // addItemToCartList(item);
                setIsAdded(true);
                // console.log(cart);
            }}
        >
        {isAdded ? navigate('/react-ecommerce-site/cart'): "Add To Cart"}
        </button>
        <p className="item-description">
            item-description
        </p>
    </div>
   </div>
  )
}

export default ItemDetail
