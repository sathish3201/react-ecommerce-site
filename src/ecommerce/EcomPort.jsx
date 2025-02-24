import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

import HomePage from './components/HomePage'
import ItemDetail from './components/ItemDetail'
import Orders from './components/Orders'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import HomePort from '../portfolio/HomePort'
import PageNotFound from './components/PageNotFound'
import Contact from '../portfolio/components/contact/Contact'
const EcomPort = () => {
  
  return (
   
     <Router>
      <Routes>
      
        <Route path='/react-ecommerce-site/login' element={<Login/>}/>
        <Route path='/react-ecommerce-site/register' element={<Register/>}/>
        <Route path='/react-ecommerce-site/contact' element={<Contact/>}/>
       
        <Route path='/react-ecommerce-site/cart' element={<Cart/>}/>
        <Route path='/react-ecommerce-site/orders' element = {<Orders/>} />
        <Route path="/react-ecommerce-site/checkout" element = {<Checkout/>} />
        <Route  path='/react-ecommerce-site/homepage' element= {<HomePage/>}/>
        <Route path='/react-ecommerce-site/item/:id' element={<ItemDetail/>}/>
        <Route exact path='/react-ecommerce-site/' element = {<HomePort/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
     </Router>
    
  )
}

export default EcomPort
