import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const user_role = localStorage.getItem("user_role")
const PageNotFound = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user_role){
      navigate('/')
      return;
    }
  })
  return (
    <div>
        <h1> PAGE NOT FOUND </h1>

    </div>
  )
}

export default PageNotFound
