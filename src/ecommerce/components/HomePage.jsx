import React from 'react'
import ProductList from './ProductList'
import AuthHoc from '../tools/AuthHoc'


const HomePage = () => {
  return (
   <section> 
     <ProductList/>
   </section>
  )
}

export default AuthHoc(HomePage)
