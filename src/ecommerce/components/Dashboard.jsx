import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar'
import { GlobalContext } from './tools/GlobalContext';
import ProductList from './ProductList';

const Dashboard = () => {
   const user_role = JSON.parse(localStorage.getItem("user_role"))
    if(!user_role.access_token){
        return <Navigate to="/" />
    }
   
    console.log(user_role.username)
    // extract  username and email
   
    
  return (
    <div>
      
        <h2>
            Welcome to Dashboard {user_role.username} {user_role.email} {user_role.access_token} {user_role.roles}
        </h2>
        <ProductList/>
    </div>
  )
}

export default Dashboard
