import React, { useEffect, useState } from 'react'
import AuthHoc from '../tools/AuthHoc'
import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '../tools/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { add_orders_from_api, deleteOrder, fetchOrders } from '../../redux/reducer/OrderReducer'
import Spinner from '../tools/Spinner'

const Orders = ({user}) => {
  const token = user?.access_token;
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const {orderValues, loading, error} = useSelector((state)=> state.orders)

  useEffect(()=>{
    if(!loaded){
    dispatch(fetchOrders(token))
    setLoaded(true)
    }
  },[dispatch, token])

  if(loading){
    return <Spinner/>
  }
  if(error){
    // window.location.reload()
    return <p>Error : order fetching :{error}</p>
  }

  return (
    <div className="container">

    {!orderValues?.length? <h2> No Orders yet....</h2>: 
     <div className="card-deck">
      {
        !!orderValues && orderValues?.map((order)=>(

         
          <div className="card" key={order.id}>
              
              <div className="btn btn-outline-danger" onClick={()=>{
                const item={
                  id : order?.id,
                  token : token
                };
                dispatch(deleteOrder(item))}}>X</div>
              <div className="btn btn-outline-primary">id :{order?.id}</div>
              <div className="btn btn-outline-primary">Email :{order?.delivery_detail?.email}</div>
              <div className="order-id"> Mobile No: {order?.delivery_detail?.mobileno}</div>
              <div className="order-id"> Address: {order?.delivery_detail?.address}</div>
              <div className="order-id">Country code: {order?.delivery_detail?.country}</div>
              <div className="order-id">State Code: {order?.delivery_detail?.state}</div>
              <div className="order-id">City : {order?.delivery_detail?.city}</div>
              <div className="order-id">zip Code: {order?.delivery_detail?.zip}</div>
              <div className="btn btn-success">Total Price : {order?.total_price}</div>

         </div>
        ))
      }
   
   </div>
   }
    </div>
  )
}

export default AuthHoc(Orders)
