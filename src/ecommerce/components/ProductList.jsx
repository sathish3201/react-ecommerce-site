import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Item from './Item';
import AuthHoc from '../tools/AuthHoc';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../tools/Spinner'
import AxiosInstance from '../tools/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { remove_user } from '../../redux/reducer/UserReducer';
import { fetchProducts } from '../../redux/reducer/ProductReducer';



const ProductList = ({user}) => { 
const token = user?.access_token;
const dispatch = useDispatch();
const {productValues, loading, error} = useSelector((state) => state.products)

useEffect(()=>{
  dispatch(fetchProducts(token))
},[dispatch , token])

if(loading){
  return <Spinner/>
}
if(error){
  return <div className="error"> Error in Fetching products ....{error.message}</div>
}


  return(
    <div className="container">
     
    <div className="row">
      
      {
       !!productValues &&  productValues?.map((item) => (
          <div className="col" key={item.id}>
          <Link to={`/item/${item.id}`}>
            <Item
              product= {item}
              quantity = {null}
            />
          </Link>
          </div>
        ))

      }
    </div>
    </div>
)
}
export default AuthHoc(ProductList)
