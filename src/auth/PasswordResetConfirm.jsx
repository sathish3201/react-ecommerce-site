import React, { useState } from 'react'
import AxiosInstance from '../ecommerce/tools/AxiosInstance';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PasswordInput from '../ecommerce/tools/PasswordInput'
import Spinner from '../ecommerce/tools/Spinner'
import Ganesh from '../portfolio/assets/utils/Ganesh';
const PasswordResetConfirm = () => {
    const {token} = useParams();

    const [formData, setFormData] = useState({
        password:'',
        confPass:'',
        loading:false,
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
        setFormData({...formData}, loading= true)
        try{
            const axiosinstance = AxiosInstance();
            const response = await axiosinstance.post(`/password-reset/${token}/`,{...formData});
            alert(`Success: ${response.data.detail}`)
            window.location.replace('/login')
        }catch(error){
            alert(` ${error.response?.data?.error} || Error setting password`)
        }finally{
            setFormData({...formData},loading= false)
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
    
    if(formData.loading){
        return <Spinner />
    }

  return (
      
  <div className='contact'>

  <div className="contact-left" id="contact-id">
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
      <button type='reset' id='reset'>Reset</button>
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
