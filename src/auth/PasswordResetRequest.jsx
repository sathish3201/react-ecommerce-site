import React, { useState } from 'react'
import AxiosInstance from '../ecommerce/tools/AxiosInstance';
import axios from 'axios';
import Spinner from '../ecommerce/tools/Spinner';
import Ganesh from '../portfolio/assets/utils/Ganesh';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const axiosinstance = AxiosInstance();
            const response = await axiosinstance.post('api/password-reset/',{email});
            alert(`Success": ${response.data.detail}`)
        }catch(error){
            alert(` ${error.response?.data?.error} || Error sending email request`)
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
      <h2>Enter Email </h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>

  <form onSubmit={handleSubmit} className='was-validated mb-3 row g-3'>
     
      <input 
              name='email'
              className='form-control col-md-4'
              type = "email"
              placeholder='Email'
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
  
    
      <div className="submit">
      <button className='btn btn-outline-primary' type='submit' id='submit'>Submit</button>
  
      </div>
     
  </form>
  
  </div>
  <div className="hero-right">
    <Ganesh />
    </div>
</div>

  )
}

export default PasswordResetRequest
