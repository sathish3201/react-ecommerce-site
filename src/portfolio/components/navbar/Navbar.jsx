import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { remove_user } from '../../../redux/reducer/UserReducer';

const Navbar = ({user}) => {
   const navigate = useNavigate();
  const dispatch = useDispatch();
    const cartLength= useSelector((state) => state.cart.cartValues?.length)
    const ordersLength= useSelector((state) => state.cart.ordersValues?.length)
  return (
    <header className='navbar-container'>
        <div className="navbar-left">
            <div className="logo-item" onClick={()=> navigate('/')}>
                <div className="logo"></div>
            </div>
           {user === (undefined || null) ? (<span className="title-item"> Sathish </span>) :(<span className="title-item"> Shopping   </span>) } 
        </div>

        <div className="navbar-right" >
            <ul className="links">
                
                <li className='input'><input type="search" className='search-item'  id="input-item" placeholder='Search....'></input>
                </li>
                <li className='login'>
                { user === (undefined || null)? ( <span  className='logo-item' onClick={()=> {navigate('/login')}} >Login </span>) :
                 (<span className="logout" onClick={()=>{dispatch(remove_user())}}> Logout</span>)
                 }   
                </li>
            {!!user && <>
              <li className="btn btn-primary" onClick={()=>{navigate('/cart')}}>
                  Cart  <span>{!!user && cartLength}</span>
                </li>
                <li className="btn btn-primary" onClick={()=>{navigate('/orders')}}>
                  Orders  <span>{!!user && ordersLength}</span>
                </li> </>}
               
                <li className='contact'>
                    <span  className='logo-item' onClick={()=> {navigate('/contact')}} >
                   Contact
                </span>    
                </li>
                

            </ul>
            {/* <div className='menu' onClick={()=>{document.querySelector(".navbar-right").classList.toggle("responsive");}}><Menu/></div> */}
        </div>
    </header>
  )
}

export default Navbar
