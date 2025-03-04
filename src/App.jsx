import React from 'react'
import Navbar from './portfolio/components/navbar/Navbar'
import Footer from './portfolio/components/footer/Footer'
import Contact from './portfolio/components/contact/Contact'
import Cart from './ecommerce/components/Cart'
import Orders from './ecommerce/components/Orders'
import Checkout from './ecommerce/components/Checkout'
import HomePage from './ecommerce/components/HomePage'
import ItemDetail from './ecommerce/components/ItemDetail'
import HomePort from './portfolio/HomePort'
import PageNotFound from './auth/PageNotFound'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Register from './auth/Register'
import Login from './auth/Login'
import Add_Item from './ecommerce/tools/Add_Item'
import PasswordResetRequest from './auth/PasswordResetRequest'
import PasswordResetConfirm from './auth/PasswordResetConfirm'

const App = () => {
  const user = useSelector((state) => state.user.user_detail)
  return (
    <div className="App">
       
        <Router basename='/react-ecommerce-site'>
          <div className="nav-section">
            <Navbar user={user} />
          </div>
         <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/pass-reset' element={<PasswordResetRequest/>}/>
            <Route path='/reset-pass/:token' element={<PasswordResetConfirm/>}/>
          
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/orders' element = {<Orders/>} />
            <Route path="/checkout" element = {<Checkout/>} />
            <Route  path='/homepage' element= {<HomePage/>}/>
            <Route path='/item/:id' element={<ItemDetail/>}/>
            <Route exact path='/' element = {<HomePort/>} />
            <Route path='*' element={<PageNotFound/>}/>

            <Route path='/add-item' element={<Add_Item/>}/>
          </Routes>
          <div className="footer-section"><Footer/></div>
       </Router>
       
    </div>
  )
}

export default App
