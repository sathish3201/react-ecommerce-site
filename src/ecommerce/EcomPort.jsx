import React from 'react'
import { Route, BrowserRouter as Router , Routes} from 'react-router-dom'
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
   
     <Router basename='/react-ecommerce-site'>
      <Routes>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/contact' element={<Contact/>}/>
       
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element = {<Orders/>} />
        <Route path="/checkout" element = {<Checkout/>} />
        <Route  path='/homepage' element= {<HomePage/>}/>
        <Route path='/item/:id' element={<ItemDetail/>}/>
        <Route exact path='/' element = {<HomePort/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
     </Router>
    
  )
}

export default EcomPort
