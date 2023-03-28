import React from 'react'

import "./Input.css"

export default function Input({label, type, value, onChange, name, placeholder, id, pattern}) {
    return (
        <form action='' className='input'>
            <p>{label}</p>
            <input type={type} value={value} onChange={onChange} name={name} placeholder={placeholder} id={id} pattern={pattern} required/>
        </form>
)
}
