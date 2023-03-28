import React from 'react'
import Input from '../../../../../components/form-input/Input'
import "./Transfer.css"


export default function Transfer({onClick, transfer, onChange, onChange2}) {
    return (
        <div className='transfer'>
            <div className='transfer-header'>
                <span></span>
                <h2>Transferir Dinheiro</h2>
                <p onClick={onClick}>X</p>
            </div>
            <Input label="ID da conta a receber o dinheiro" type="number" onChange={onChange2} name="id"/>
            <Input label="Valor da Transferencia" type="number" onChange={onChange} name="valor"/>
            <button onClick={transfer}>Transferir</button>
        </div>
    )
}