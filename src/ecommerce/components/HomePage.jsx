import React, { useState } from 'react'
import ProductList from './ProductList'
import AuthHoc from '../tools/AuthHoc'
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../tools/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { add_orders_from_api } from '../../redux/reducer/OrderReducer';


const HomePage = ({user}) => {
  const token = user?.access_token;
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
 /// for orders 
 const getOrderValues=()=>{
  if(loaded){
    return;
  }
  setLoaded(true);
const getOrders=async(token)=>{
  const axiosinstance = AxiosInstance(token)
  const response = await axiosinstance.get('/orders/');
  if(response.status == 402){
      alert('Session TimeOut. Redirecting to Login....')
      dispatch(remove_user())
      window.location.replace('/login')
    }
    console.log(response)
  return response.data;
}

const {data:orderdata, error:orderError, isLoading:orderLoading} = useQuery({
  queryKey:['getOrders', token],
  queryFn:()=> getOrders(token),
  refetchOnWindowFocus : false,
  retry: 3,
  enabled : !!token,
  staleTime: 1000*60*5 // render per two minute
});
if(orderLoading){
  return <p>Loading orders....</p>
}
if(orderError){
  return <p>error in order loading</p>
}

console.log([...orderdata])
if(orderdata){
  const new_data= [...orderdata]?.filter((item)=> item.user.id === user.user.id);
  dispatch(add_orders_from_api([...new_data]))
}
 }
 



  return (
   <section> 
    {!loaded && getOrderValues()}
     <ProductList/>
   </section>
  )
}

export default AuthHoc(HomePage)
