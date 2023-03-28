import React from 'react'

import "./Nav.css"
import Logo from "../../images/logo.png"

function home(){
    window.location.href = "http://localhost:3000";
}

export default function Nav() {
    return (
        <div className='nav'>
            <img src={Logo} alt="" onClick={home}/>
        </div>
)
}
