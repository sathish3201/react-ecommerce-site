import React,{useRef, useState} from 'react'

import "./Hero.css"
import { Navigate } from 'react-router-dom';
import Ganesh from '../../assets/utils/Ganesh';
import Login from '../../../auth/Login';

const Hero = () => {
  
 
  return (
   <div className="hero">
    <div className="hero-left">
        <div className="title">
            <div className="line">
              
              Hi,&nbsp;I'm<span className='name'> Sathish</span></div>
            <div className="line-2 soft-anitext">Software Developer</div>
        </div>
        <div className="caption cap-anitext">
          <p> I'm Passionate to Develop responsive UI/UX Design.</p>
        </div>
  
        
        <ul className="links">
          
        <li className='theme-item'>
          
        <input type='checkbox' className="theme" />
        
        </li>
        <li className='login'>
        <span className="login-item" onClick={() => {window.location.replace('/login')}}>Login</span>
        </li>
        </ul>
    </div>
    <div className="hero-right">
      <Ganesh />
    </div>
   </div>
  )
}

export default Hero
