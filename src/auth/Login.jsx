import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import process from 'process';
import { useDispatch } from 'react-redux';

import Ganesh from '../portfolio/assets/utils/Ganesh';
import { add_user } from '../redux/reducer/UserReducer';
import AxiosInstance from '../ecommerce/tools/AxiosInstance';




const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        const axiosinstance = AxiosInstance();
        const response = await axiosinstance.post('/auth/login/',{
            username,
            password
        });

        console.log(response.data.user_role)
       
        dispatch(add_user(response.data.user_role))
        setSuccessMessage("Login Successfull !!!")
        navigate('/homepage')
    }catch(error){
        if(error.response){
            setErrorMessage(error.response.data.detail || "Invalid Credentials")
        }else{
            setErrorMessage('Network Error' || error)
        }
    }
  }
  return (
    
  <div className='contact'>

  <div className="contact-left" id="contact-id">
    <div className="header">
      <h2>Login </h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>

  <form onSubmit={handleSubmit} className='was-validated mb-3'>
     
      <input 
              className='form-control'
              type = "text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
  
   
  
      <input 

              className='form-control'
              type = "password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        
       

    
      <div className="submit">
      <button type='submit' id='submit'>LOGIN</button>
      <button type='reset' id='reset'>Reset</button>
      </div>
      {successMessage && <div className='valid-feedback valid-tooltip'>{successMessage}</div>}
      {errorMessage && <div className='invalid-feedback valid-tooltip'>{errorMessage}</div>}
  </form>
  
  <div className="link-ext" onClick={()=>{navigate('/register')}}>
    <p>Register Me</p>
  </div>
  </div>
  <div className="hero-right">
    <Ganesh />
    </div>
</div>

  )
}

export default  Login
