import React from 'react'
import { useSelector } from 'react-redux'



const AuthHoc = (Component) => {  
  return (props) =>{
    const user = useSelector((state) => state.user.user_detail)
    return (!!user)? (<Component {...props} user = {user} />) :  window.location.replace('/')
  }
}

export default AuthHoc;
