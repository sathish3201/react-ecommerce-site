import React from 'react'
import { useDispatch } from 'react-redux'
import { decrement_item, increment_item, remove_from_cart } from '../../redux/reducer/CartReducer';

const Item = ({product , quantity= null}) => {
  const dispatch = useDispatch();
  console.log(quantity)
  
 const decrementCart=(e)=>{
    if(quantity <=1){
      dispatch(decrement_item({id:product.id}));
      dispatch(remove_from_cart({id: product.id}));
    }else{
      dispatch(decrement_item({id:product.id}));
    }
 }
  return (
    <div className='card col-md-3'>
      
        {quantity!== null && <span className="remove-item btn btn-outline-danger"  id ="item-close" onClick={()=>{dispatch(remove_from_cart({id: product.id}))}}>X</span>}
        <img src={product?.thumbnail} className='card-img-top' alt={"....."} width="100%" />
        <div className="card-body">
          <h5 className="card-title"> Brand : {product?.brand}</h5>
          <p className="card-text text-primary">Price (Rs): {product?.price}</p>
          <div className="card-text text-danger">Stock : {product?.stock}</div>
          {quantity!== null && (<div className="cart-quantity">
            
            <input type='button' className="add btn btn-outline-secondary" onClick={()=>{dispatch(increment_item({id: product.id}))}} value="+"/>
            <span className="btn btn-outline-primary">Quantity : {quantity}</span>
            <input type="button" className="minus btn btn-outline-secondary" onClick={decrementCart} value="-"/>
            </div>)}
        </div>
        <div className="cart-footer">
          <small className="text-muted"> {product?.rating} &#9733; </small>
        </div>
    </div>
  
  )
}

export default Item
