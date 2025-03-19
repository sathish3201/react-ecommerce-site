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

  <div className="cont-box" id="contact-id">
    <div className="header">
      <h2>Register </h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>


    {/* <form class="row g-3">
  <div class="col-md-4">
    <label for="validationServer01" class="form-label">First name</label>
    <input type="text" class="form-control is-valid" id="validationServer01" placeholder='First Name' required/>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationServer02" class="form-label">Last name</label>
    <input type="text" class="form-control is-valid" id="validationServer02" placeholder='Last Name' required/>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationServerUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend3">@</span>
      <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" placeholder='User Name' required/>
      <div id="validationServerUsernameFeedback" class="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <label for="validationServer03" class="form-label">City</label>
    <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer03Feedback" required/>
    <div id="validationServer03Feedback" class="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  </form> */}
   <form onSubmit={handleSubmit} className='was-validated row g-3'>
    
    
      <input 
              className='form-control col-md-4'
              type = "text"
              placeholder='firstName '
              name='fname'
              value={formData.fname}
              onChange={handleChange}
              required
            />
          
            <input 
            name='lname'
            className='form-control col-md-4 '
            type = "text"
            placeholder='Last Name'
            value={formData.lname}
            onChange={handleChange}
            required
          />
          
       

           <input 
           name='email'
            className='form-control col-md-4'
            type = "email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter valid  email address."
            required
          />
          <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend3">@</span>
           <input 
            name='username'
            className='form-control col-md-4'
            type = "text"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
