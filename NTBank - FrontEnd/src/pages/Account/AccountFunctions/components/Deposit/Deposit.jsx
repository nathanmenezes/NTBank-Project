import React from 'react'
import Input from '../../../../../components/form-input/Input'
import "./Deposit.css"


export default function Deposit({onClick, deposit, onChange}) {
    return (
        <div className='deposit'>
            <div className='deposit-header'>
                <span></span>
                <h2>Depositar Dinheiro</h2>
                <p onClick={onClick}>X</p>
            </div>
            <Input label="Valor do Deposito" type="number" onChange={onChange}/>
            <button onClick={deposit}>Depositar</button>
        </div>
    )
}
