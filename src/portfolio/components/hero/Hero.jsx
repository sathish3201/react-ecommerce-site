import React,{useRef, useState} from 'react'
// import { SocialIcon } from 'react-social-icons';
import "./Hero.css"
import { Navigate } from 'react-router-dom';
import Ganesh from '../../assets/utils/Ganesh';
import Login from '../../../auth/Login';

const Hero = () => {
  const [islight,setIsLight] = useState(false);
  const check=(event)=>{
    if(event.target.checked){
        setIsLight(true);
    }else{
        setIsLight(false);
    }
  }
  return (
   <div className="hero">
    <div className="hero-left">
        <div className="title">
            <div className="line">
              
              Hi,&nbsp;I'm<span className='name'>Sathish</span></div>
            <div className="line-2">Software Developer</div>
        </div>
        <div className="caption">
          <p> I'm Passionate to Develop responsive UI/UX Design.</p>
        </div>
        
        <ul className="links">
          
        <li className='theme-item'>
          
          <input type="checkbox" id="theme" onChange={check}/>
          <label htmlFor="theme"><span>
            {islight? "Dark": "Light"} Mode
            </span></label>
        
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
