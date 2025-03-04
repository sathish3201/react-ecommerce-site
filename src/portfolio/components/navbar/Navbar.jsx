import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { remove_user } from '../../../redux/reducer/UserReducer';
import Menu from '../../assets/utils/menu/Menu';
const Navbar = ({user}) => {
   const navigate = useNavigate();
  const dispatch = useDispatch();
    const cartLength= useSelector((state) => state.cart.cartValues?.length)
    const ordersLength= useSelector((state) => state.orders.orderValues?.length)
    
    const handleClick=(event)=>{
      event.preventDefault();
      const menu=document.getElementById("menu-bar");
      const nav_id=document.getElementById("nav-id");
      menu.classList.toggle("responsive");
      nav_id.classList.toggle("responsive");
  }
  return (
    <header className='navbar-container'>
        <div className="navbar-left">
            <div className="logo-item" onClick={()=> navigate('/')}>
                <div className="logo"></div>
            </div>
           {user === (undefined || null) ? (<span className="title-item"> Sathish </span>) :(<span className="title-item" onClick={()=>{navigate('/homepage')}}> Shopping   </span>) } 
        </div>
       <Menu onClick={handleClick}/>  
        <div className="navbar-right" id="nav-id">
            <ul className="links">
                
                
                <li className='nav-item'>
                { user === (undefined || null)? ( <span  className='logo-item' onClick={()=> {navigate('/login')}} >Login </span>) :
                 (<span className="logout" onClick={()=>{dispatch(remove_user())}}> Logout</span>)
                 }   
                </li>
            {!!user && <>
              <li className="nav-item" onClick={()=>{navigate('/cart')}}>
                  Cart : {!!user && cartLength}
                </li>
                <li className="nav-item" onClick={()=>{navigate('/orders')}}>
                  Orders :{!!user && ordersLength}
                </li> </>}
               
                <li className='item'>
                    <span  className='logo-item' onClick={()=> {navigate('/contact')}} >
                   Contact
                </span>    
                </li>
                <li className='nav-item'><input type="search" className='search-item'  id="input-item" placeholder='Search....'></input>
                </li>

            </ul>
            {/* <div className='menu' onClick={()=>{document.querySelector(".navbar-right").classList.toggle("responsive");}}><Menu/></div> */}
        </div>
    </header>
  )
}

export default Navbar
