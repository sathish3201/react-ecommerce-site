import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Item from './Item';

 const user_role = JSON.parse(localStorage.getItem("user_role"));
 const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";
const ProductList = () => {
  
  const [products, setProducts] = useState(null) 
  const navigate = useNavigate()

    useEffect(()=>{    
          if(!user_role){
            navigate('/')
            
          }
      const getProducts= async(token)=>{
        try{
            const response = await axios.get(`${backendurl}/products/`,
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                }
            );
            setProducts(response.data);
            
        }catch(error){
            console.log(error.data.response)
        
        }
       
    }
    !!user_role && getProducts(user_role?.access_token);
    },[])

    // useEffect(()=>{
    //   const getCart= async(token)=>{
    //     try{
    //         const response = await axios.get(`${backendurl}/api/cart/`,
    //             {
    //                 headers : {
    //                     Authorization : `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         setCart(response.data);
    //         console.log(response.data);
    //     }catch(error){
    //         console.log(error.data.response)
        
    //     }
       
    // }
    // getCart(user_role.access_token);
    // },[])

    console.log(products);
   localStorage.setItem('product-items',JSON.stringify(products))
  return (
    <div className="product-list">
      {
        !!products &&  products.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id}>
            <Item
                name= {item.name}
                price  = {item.price} 
                rating = {item.rating}
                saleDiscount={item.saleDiscount}
                image = {item.image}
                brand = {item.brand}
                stock = {item.stock}
            />
          </Link>
        ))

      }
    </div>
)
}
export default ProductList
