import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Ganesh from '../../portfolio/assets/utils/Ganesh';
import process from 'process';
// let backendurl =  "http://127.0.0.1:80/api"

const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";
const Login = () => {
  localStorage.removeItem("user_role");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await axios.post(`${backendurl}/auth/login/`,{
            username,
            password
        });
       
        localStorage.setItem("user_role", JSON.stringify(response.data.user_role))
        console.log(response.data.user_role)
        // getProducts(response.data.user_role.access_token);
        //  console.log(JSON.parse(localStorage.getItem("user_role")))
        // redirect to product list page
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

<form onSubmit={handleSubmit}>
    <div className="uname">
   
    <input 
            
            type = "text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
    </div>
    <div className="password_box">
 
    <input 
            id= "pass"
            type = "password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      
      <input type='checkbox' name='show_password' className="check_box" />
    </div>
   
    <div className="submit">
    <button type='submit' id='submit'>LOGIN</button>
    <button type='reset' id='reset'>Reset</button>
    </div>
    
</form>
{errorMessage && <p>{errorMessage}</p>}
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

export default Login
