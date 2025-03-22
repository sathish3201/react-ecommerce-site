import React, { useState } from 'react'

const PasswordInput = ({id,placeholder, name, value, onChange}) => {
    const[show, setShow] = useState(false);
  return (
    <div className='password-container'>
      <input 
        id={id}
        type={show ? `text` : `password`}
        className='form-control col-md-4'
        name = {name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%?&])[A-Za-z\d@#$%?&]{8,}$"
        title = "Password must be atleast 8 characters long and contains atleast one upper case letter, one lower case letter, one number and one special character"
        required
      />
    <div class="form-check mb-3 pt-1">

    <input  className="form-check-input"  type="checkbox"  id="showPassword"  checked={()=> setShow(true)} onChange={()=> setShow(!show)}/>
    <label  htmlFor="showPassword"  className="form-check-label" >Show Password</label>
    
  </div>
  

    </div>
  )
}

export default PasswordInput
