import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthHoc from '../tools/AuthHoc';

import AxiosInstance from '../tools/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart } from '../../redux/reducer/CartReducer';
import { remove_user } from '../../redux/reducer/UserReducer';

const ItemDetail = ({user}) => {
  const navigate = useNavigate();
    const products = useSelector((state) => state.products.productValues)
    const token= user?.access_token;
    const param = useParams();
    const Itemid = parseInt(param?.id)
    const item = !!Itemid && products.filter((item)=> item.id === Itemid)[0];
    const [isAdded, setIsAdded] = useState(false);
    const dispatch = useDispatch();  
  return (
   <>
    <div className="Back btn btn-outline-primary" onClick={()=>{navigate('/homepage')}}> # Back</div>
    <div>
      <div className="card card-item d-flex flex-wrap align-content-center justify-content-evenly" >
           
                    <img src={item?.image} alt=" image " />

              
               
                    <div className="card-body card-item m-2 p-2 mr-1 ">
                        <div className="card-title d-flex flex-wrap justify-content-evenly">
                        <span className="title-item">{item?.title}</span>
                        <span className=" card-brand brand-item btn btn-outline-success"> Brand : {item?.brand}</span>
                        </div>
                       
                        <div className="card-text card-item d-flex flex-wrap justify-content-evenly ">
                          <span className="price-item btn btn-outline-primary">Price : {item?.price}</span>
                          <span className="stock-item btn btn-outline-danger">Stock : {item?.stock}</span>
                          <span className="discount-item btn btn-outline-success"> discount: {item?.discountPercentage}</span>
                          <span className="rating-item btn btn-outline-dark">rating : {item?.rating}</span>
                          </div>

                        <div className="item-desc d-flex flex-wrap ">{item?.description}</div>
                    </div>
             <button type="button" className={isAdded ? `btn btn-success`:`btn btn-primary`}
             onClick={() =>{
              if(!isAdded){
                
              dispatch(add_to_cart({product: item, quantity : 1}))
              setIsAdded(true)
              return;
              }
              navigate('/cart')
            
             }}
             >{isAdded ? "GO TO CART": "ADD TO CART"}</button>
      </div>
    </div>
    </>
  )
}

export default AuthHoc(ItemDetail)



