import React, { useState } from 'react'
import "./Contact.css"
import Ganesh from '../../assets/utils/Ganesh';
import AxiosInstance from "../../../ecommerce/tools/AxiosInstance"

const Contact = () => {
  const [formData, setFormData]= useState({
    email:'',
    subject:'',
    message:'',
  });
  const handleChange=(e)=>{
    const {name, value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      const axiosinstance = AxiosInstance();
      const response = await axiosinstance.post('/auth/contact/',{...formData})
      alert(`${response.data.detail}`)
    }catch(error){
      alert(` Network Error: ${error.response}`)
    } 
  }
  return (
    <div className='contact'>

        <div className="contact-left" id="contact-id">
          <div className="header">
            <h2>Contact Form</h2>
            <span className='close' id="close" onClick={()=>{
              document.getElementById("contact-id").style.display="none";
            }}>&times;</span>
          </div>
       
        <form onSubmit={handleSubmit} className='was-validate'>
           
            <div className="form-control">
         
            <input type="email" name="email" id="email" placeholder='Email' value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="form-control">
           
           <input type="text" name="subject" id="subject" placeholder='Subject' value={formData.subject} onChange={handleChange} required/>
           </div>
            <div className="form-control">
         
            <textarea type="message" name="message" id="message" rows={5} value={formData.message} placeholder='Enter your Query...' onChange={handleChange} required/>
            </div>
            <div className="form-row">
            <div className="col-12">
            <div className="form-check">
              <input type="checkbox" className="form-check-input"  value="" id="invalidcheck" required/>
              <label htmlFor="invalidcheck" className='form-check-label'> Agree to terms and condition</label>
              <div className="invalid-feedback">You must agree before submitting</div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-outline-primary">Submit</button>
          
      </div>
            </div>
        </form>
        </div>
        
        <div className="hero-right">
              <Ganesh />
         </div>
       
    </div>
  )
}

export default Contact
