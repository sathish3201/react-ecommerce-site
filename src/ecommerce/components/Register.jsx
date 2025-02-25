import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Ganesh from '../../portfolio/assets/utils/Ganesh';

// let backendurl =  ""


const backendurl= process.env.VITE_BACKEND_URL !== undefined ?process.env.VITE_BACKEND_URL : "http://127.0.0.1:80/api";
const Register = () => {
  
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const  [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer') ;// default role
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  localStorage.removeItem("user_role");



  const handleSubmit= async(e) =>{
    e.preventDefault();
    // check if password and confirm password match
    
    if(password !== confirmPassword){
      setErrorMessage("Passwords doesnot Match")
      return;
    }
    try{
      const response = await axios.post(`${backendurl}/auth/register/`,{
        fname,
        lname,
        username,
        email,
        password,
        role
      })
      console.log(response.data)
      // navigate to login
      navigate('/login')

    }catch(error){
      if(error.response){
        setErrorMessage(error.response.data.detail || 'Error in creating user');
      }else{
        setErrorMessage("Network Error");
      }
    }
  };


  return (
    <div className='contact'>

<div className="contact-left" id="contact-id">
  <div className="header">
    <h2>Register </h2>
    <span className='close' id="close" onClick={()=>{
      document.getElementById("contact-id").style.display="none";
    }}>&times;</span>
  </div>
      <form onSubmit={handleSubmit} className='form'>
      <div className="fname">
        <input 
            type = "text"
            placeholder='FirstName'
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="lname">
        <input 
            type = "text"
            placeholder='LastName'
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
      <div className="uname">
        <input 
            type = "text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="email">
        <input 
            type = "email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div className="email">
            <input 
            type = "password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          
          />
           <input type='checkbox' name='show_password' className="check_box" />
          </div>
          <div className="email">
            <input 
            type = "password"
            placeholder=' Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            
          />
           <input type='checkbox' name='show_password' className="check_box" />
          </div>
          <div className="email" >
        <select value={role} onChange={(e) => setRole(e.target.value)} >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
        </div>
        <div className="submit">
          <button type='submit' id='submit'>Register</button>
          <button type='reset' id='reset'>Reset</button>
        </div>
  
      </form>
      <div className="link-ext" onClick={() => {navigate("/login")}}>
        <p >Already Registered</p>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    <div className="hero-right">
  <Ganesh />
    </div>
   </div>


  )
}

export default Register
