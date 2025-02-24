import React from 'react'
import "./Footer.css";
const Footer = () => {
  console.log(document.getElementById("contact"));
  return (
    <footer>
        <div className="footer-left">
            <div className="logo"></div>
        </div>
        <div className="footer right">
            &#169; Copyright 2024 @Sathish
        </div>
    </footer>
  )
}

export default Footer
