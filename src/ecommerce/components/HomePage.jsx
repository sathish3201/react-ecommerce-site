import React, { useEffect } from 'react'
import ProductList from './ProductList'

import { useNavigate } from 'react-router-dom'



const HomePage = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const user_role = JSON.parse(localStorage.getItem('user_role'))
    if(!user_role){
      navigate('/react-ecommerce-site/login')
      return;
    }
  },[])
 
  return (
   <section>
     
     <ProductList/>
   </section>
  )
}

export default HomePage
