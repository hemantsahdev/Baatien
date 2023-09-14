import React from 'react'
import './nav.css'

const Nav = () => {
  return (
    <>
       <header>
        <nav>
            <div class="logo">
                <a href="#">CareBridge</a>
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Appointments</a></li>
                <li><a href="#">Chats</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Nav
