import React from 'react'
import "./Menu.css"



const Menu = ({onClick}) => {
  
  return (
    <div id="menu-bar" className="menu-item" onClick={onClick}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
    </div>
  )
}

export default Menu
