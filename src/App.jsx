import React from 'react'
import EcomPort from './ecommerce/EcomPort'
import Navbar from './portfolio/components/navbar/Navbar'
import Footer from './portfolio/components/footer/Footer'
import Login from './ecommerce/components/Login'
import Register from './ecommerce/components/Register'
import Contact from './portfolio/components/contact/Contact'
import Cart from './ecommerce/components/Cart'
import Orders from './ecommerce/components/Orders'
import Checkout from './ecommerce/components/Checkout'
import HomePage from './ecommerce/components/HomePage'
import ItemDetail from './ecommerce/components/ItemDetail'
import HomePort from './portfolio/HomePort'
import PageNotFound from './ecommerce/components/PageNotFound'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App = () => {
  
  return (
    <div className="App">
        <div className="nav-section">
          <Navbar/>
        </div>
        <Router basename='/react-ecommerce-site/'>
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
        <div className="footer-section"><Footer/></div>
    </div>
  )
}

export default App
