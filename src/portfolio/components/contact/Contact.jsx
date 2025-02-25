import React from 'react'
import "./Contact.css"
import Ganesh from '../../assets/utils/Ganesh';
const Contact = () => {
  return (
    <div className='contact'>

        <div className="contact-left" id="contact-id">
          <div className="header">
            <h2>Contact Form</h2>
            <span className='close' id="close" onClick={()=>{
              document.getElementById("contact-id").style.display="none";
            }}>&times;</span>
          </div>
       
        <form action="">
            <div className="uname">
           
            <input type="text" name="username" id="username" placeholder='UserName'/>
            </div>
            <div className="email">
         
            <input type="email" name="email" id="email" placeholder='Email'/>
            </div>
            <div className="subject">
         
            <textarea type="subject" name="subject" id="subject" rows={5}  placeholder='Enter your Query...'/>
            </div>
            <div className="submit">
            <button type='submit' id='submit'>Submit</button>
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

export default Contact
