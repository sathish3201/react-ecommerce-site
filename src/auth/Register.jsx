import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Ganesh from '../portfolio/assets/utils/Ganesh';
import { add_user } from '../redux/reducer/UserReducer';
import AxiosInstance from '../ecommerce/tools/AxiosInstance';
import PasswordInput from '../ecommerce/tools/PasswordInput';
import Spinner from '../ecommerce/tools/Spinner';



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    fname:'',
    lname : '',
    username:'',
    email : '',
    password:'',
    confPass:'',
  });
  const [errorsData, setErrorsData] = useState({
    mismatch:'',
  });

  const validate=()=>{
  
    let isValid=true;
   
    if(formData.password !== formData.confPass){
      alert("Passwords  should be match...") 
      
      // throw Error("passwordmismatch error...")
      isValid = false
    }
   
    return isValid;
  };

  const handleChange=(e)=>{
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();

   if(validate()){
      try{
        setLoading(true)
          console.log({formData})
          const axiosinstance = AxiosInstance();
          const response = await axiosinstance.post('api/auth/register/',{
          ...formData
          });
          console.log(response.data.user_role)
          dispatch(add_user(response.data.user_role))
          alert("Registration is Successfull...")
          navigate('/homepage')
      }catch(error){
        alert(`${error.response?.data?.error} || error in login`)
      }finally{
        setLoading(false)
      }
    }
  }
  if(loading){
    return <Spinner/>
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
              name='fname'
              value={formData.fname}
              onChange={handleChange}
              required
            />
          
            <input 
            name='lname'
            className='form-control '
            type = "text"
            placeholder='Last Name'
            value={formData.lname}
            onChange={handleChange}
            required
          />
          
       

           <input 
           name='email'
            className='form-control'
            type = "email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter valid  email address."
            required
          />
           <input 
            name='username'
            className='form-control '
            type = "text"
            placeholder='Username'
            value={formData.username}
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

        <PasswordInput 
          id = "confPass"
          name = "confPass"
          placeholder = "Confirm Password"
          value={formData.confPass}
          onChange={handleChange}
        />
            
          {!!formData.mismatch && <div className="invalid-feedback">{formData.mismatch}</div>}
  
          <div className="form-row">
          <div className="col-12">
            <div className="form-check">
              <input type="checkbox" className="form-check-input"  value="" id="invalidcheck" required/>
              <label htmlFor="invalidcheck" className='form-check-label'> Agree to terms and condition</label>
              <div className="invalid-feedback">You must agree before submitting</div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-outline-primary">Register</button>
          
      </div>
      </div>
  </form>

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
