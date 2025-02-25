import React from 'react'
import EcomPort from './ecommerce/EcomPort'
import Navbar from './portfolio/components/navbar/Navbar'
import Footer from './portfolio/components/footer/Footer'

const App = () => {
  
  return (
    <div className="App">
        <div className="nav-section">
          <Navbar/>
        </div>
          <EcomPort />
        <div className="footer-section"><Footer/></div>
    </div>
  )
}

export default App
