import React from 'react'
import Input from '../../../../../components/form-input/Input'
import "./Withdraw.css"


export default function Withdraw({onClick, withdraw, onChange}) {
    return (
        <div className='withdraw'>
            <div className='withdraw-header'>
                <span></span>
                <h2>Sacar Dinheiro</h2>
                <p onClick={onClick}>X</p>
            </div>
            <Input label="Valor do Saque" type="number" onChange={onChange}/>
            <button onClick={withdraw}>Sacar</button>
        </div>
    )
}
