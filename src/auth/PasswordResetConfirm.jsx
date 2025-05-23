import React, { useState } from 'react'
import AxiosInstance from '../ecommerce/tools/AxiosInstance';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PasswordInput from '../ecommerce/tools/PasswordInput'
import Spinner from '../ecommerce/tools/Spinner'
import Ganesh from '../portfolio/assets/utils/Ganesh';
const PasswordResetConfirm = () => {
    const {token} = useParams();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        password:'',
        confPass:'',
    });

const validate=()=>{
       
        let isValid=true;
       
        if(formData.password !== formData.confPass){
          alert("Passwords  should be match...") 
          isValid = false
        }
       
        return isValid;
    };
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(validate()){
        try{
            setLoading(true)
            const axiosinstance = AxiosInstance();
            const response = await axiosinstance.post(`api/password-reset/${token}/`,{...formData});
            alert(`Success: ${response.data.detail}`)
            window.location.replace('/login')
        }catch(error){
            alert(` ${error.response?.data?.detail} || Error setting password`)
        }finally{
            setLoading(false)
        }
    }   
    }
   
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name] : value
        }))
    }
    
    if(loading){
        return <Spinner />
    }

  return (
      
  <div className='contact'>

  <div className="cont-box" id="contact-id">
    <div className="header">
      <h2>Password Reset </h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>

  <form onSubmit={handleSubmit} className='was-validated '>
    
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

export default PasswordResetConfirm
