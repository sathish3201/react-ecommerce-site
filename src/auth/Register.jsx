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
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [confPass, setConfPass] = useState('');

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  
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
      <h2>Register </h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>

  <form onSubmit={handleSubmit} className='was-validated '>
    
    
      <input 
              className='form-control'
              type = "text"
              placeholder='firstName '
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          
            <input 
            className='form-control '
            type = "text"
            placeholder='Last Name'
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
           
     
  
    
    <input 
            className='form-control'
            type = "text"
            placeholder='Username'
            value={lname}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
       

           <input 
            className='form-control'
            type = "text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
   
  
  
      <input 
             className='form-control flex-grow-1 flex-basis-500'
              id= "pass"
              type = "password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
       <input 
             className='form-control'
              id= "confPass"
              type = "password"
              placeholder='Confirm Password'
              value={confPass}
              onChange={(e) => setConfPass(e.target.value)}
              required
            />
            
  
    
      <div className="submit">
      <button type='submit' id='submit'>LOGIN</button>
      <button type='reset' id='reset'>Reset</button>
      </div>
      
  </form>
  {errorMessage && <p>{errorMessage}</p>}
  <div className="link-ext" onClick={()=>{navigate('/login')}}>
    <p>Alredy Registerd!!</p>
  </div>
  </div>
  <div className="hero-right">
    <Ganesh />
    </div>
</div>

  )
}

export default  Login
