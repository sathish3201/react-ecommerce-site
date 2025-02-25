import React, { useState } from 'react'
import "./Navbar.css"
const user_role = JSON.parse(localStorage.getItem("user_role"));
const Navbar = () => {
   
  console.log(user_role)
  return (
    <header className='navbar-container'>
        <div className="navbar-left">
            <div className="logo-item">
                <div className="logo"></div>
            </div>
            <span className="title-item">Sathish</span>
        </div>

        <div className="navbar-right">
            <ul className="links">
                
                <li className='input'><input type="search" className='search-item'  id="input-item" placeholder='Search....'></input>
                </li>

                
                
                <li className='login'><span  className='logo-item'>
                    {
                        !!user_role ? <a href="/react-ecommerce-site/" onClick={()=> localStorage.removeItem("user_role")}>Logout</a> : <a href="/login"> Login</a>
                    } 
                    </span></li>
                
                

            </ul>
            {/* <div className='menu' onClick={()=>{document.querySelector(".navbar-right").classList.toggle("responsive");}}><Menu/></div> */}
        </div>
    </header>
  )
}

export default Navbar
