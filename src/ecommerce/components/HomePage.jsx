import React, { useState } from 'react'
import ProductList from './ProductList'
import AuthHoc from '../tools/AuthHoc'
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../tools/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { add_orders_from_api } from '../../redux/reducer/OrderReducer';


const HomePage = ({user}) => {
  return (
   <section> 
   
     <ProductList/>
   </section>
  )
}

export default AuthHoc(HomePage)
