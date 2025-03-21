import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import process from 'process';
import { useDispatch } from 'react-redux';

import Ganesh from '../portfolio/assets/utils/Ganesh';
import { add_user } from '../redux/reducer/UserReducer';
import AxiosInstance from '../ecommerce/tools/AxiosInstance';
import PasswordInput from '../ecommerce/tools/PasswordInput';
import Spinner from '../ecommerce/tools/Spinner';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
   const [formData, setFormData] = useState({
      email : '',
      password:'',
    });
 
    const handleChange=(e)=>{
      const {name, value} = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name] : value,
      }));
    }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)
    try{
        const axiosinstance = AxiosInstance();
        const response = await axiosinstance.post('api/auth/login/',{
           ...formData
        });

        console.log(response.data.user_role)
       
        dispatch(add_user(response.data.user_role))
        alert("Login Successfull !!!")
        navigate('/homepage')
    }catch(error){
      console.log(error)
       alert(`${error.response?.data?.error} || error in login`)
    }finally{
      setLoading(false)
    }
  }
  if(loading){
    return <Spinner/>
  }
  return (
    
  <div className='contact'>

  <div className="cont-box" id="contact-id">
    <div className="header">
      <h2>Login </h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>

  <form onSubmit={handleSubmit} className='was-validated row g-3'>
     
      <input 
              name='email'
              className='form-control col-md-4'
              type = "email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
  
   

        <PasswordInput
          id = "pass"
          name = "password"
          placeholder = "Password"
          value={formData.password}
          onChange={handleChange}
        />
        
       

        <div className="form-row">
        <div className="col-12">
            <div className="form-check">
              <input type="checkbox" className="form-check-input"  value="" id="invalidcheck" required/>
              <label htmlFor="invalidcheck" className='form-check-label'> Agree to terms and condition</label>
              <div className="invalid-feedback">You must agree before submitting</div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-outline-primary">Login</button>
          </div>
          </div>
  
  </form>
      
  <div className="link-ext" onClick={()=>{navigate('/register')}}>
    Register Me
  </div>
      <span className=' text-primary' onClick={()=>{navigate('/pass-reset')}}>Forget Password !!!</span>
  </div>
  <div className="hero-right">
    <Ganesh />
    </div>
</div>

  )
}

export default  Login
