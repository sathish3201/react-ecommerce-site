import React from 'react'
import "./Menu.css"


const handleMenu=(event)=>{
    event.preventDefault();
    const menu=document.getElementById("menu-bar");
    menu.classList.toggle("change");
}

const Menu = () => {
  
  return (
    <div id="menu-bar" className="menu-box" onClick={handleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
    </div>
  )
}

export default Menu
