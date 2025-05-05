import React from 'react'

import Hero from './components/hero/Hero'
import Content from './components/content/Content'

import Contact from './components/contact/Contact'
import '../App.css'


const HomePort = () => {
  localStorage.removeItem("user_role");
 
  return (
      <>
        <div className="hero-section" id="home"> <Hero/></div>
        <div className="content-section" id="about"><Content/></div>
        
      </>
    
  )
}

export default HomePort
