import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Item from './Item';
import AuthHoc from '../tools/AuthHoc';
import { useQuery } from '@tanstack/react-query';

import AxiosInstance from '../tools/AxiosInstance';



const ProductList = ({user}) => { 
const token = user?.access_token;
// fetching products 
 const fetchData = async(token) => {
  const axiosinstance  = AxiosInstance(token)
  const response = await axiosinstance.get('/products/')
  console.log(response)
  return response.data;
 }

 console.log(token)
// use query to fetch details
const {data , error, isLoading} = useQuery({
  queryKey : ["products", token],
  queryFn : () => fetchData(token),
  retry:3,
  enabled : !!token,
  refetchOnWindowFocus : false,
  staleTime : 1000*60*5,
});

if(isLoading){
  return <div className="loading">loading Products....</div>
}
if(error){
  return <div className="error"> Error in Fetching products ....{error.message}</div>
}
if(data){
  console.log(data)
}
  return(
    <div className="container">
      
    <div className="row row-cols-3 rows-cols-md-4">
      
      {
       !!data &&  data?.map((item) => (
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
