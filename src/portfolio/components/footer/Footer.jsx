import React from 'react'
import "./Footer.css";
const Footer = () => {
  console.log(document.getElementById("contact"));
  return (
    <footer className='container sticky-bottom'>
        <div className="footer-left">
            <div className="logo"></div>
        </div>
        <div className="footer right">
            &#169; Copyright 2024 @Sathish
        </div>
        <div className="github-icon">
            {/* <SocialIcon network='github' url='https://github.com/sathish-1023/' /> */}
            {/* <SocialIcon network='github' url=''label='github'
            /> */}
            <a href="https://github.com/sathish3201/" class="fa fa-github" target='_blank'></a>
          </div>
          <div className="linkdin-icon">
              {/* <SocialIcon network='linkedin' url='https://www.linkedin.com/in/sathish-chakali-91221b320/'label='linkedin'/> */}
              <a href="https://www.linkedin.com/in/sathish-chakali-91221b320/" class="fa fa-linkedin" target='blank'> </a>
          </div>
    </footer>
  )
}

export default Footer
