import React, { useState } from 'react';
import Input from '../../components/form-input/Input';
import Nav from '../../components/nav-bar2/Nav';
import Send from '../../components/send-form/Send';

import "./Register.css";

function Register() {
    const moment = require('moment');

    function redirect(){
        window.location.href = "http://localhost:3000/login"
    }

    const usuario = {
        nome : '',
        cpf : '',
        dataNascimento : '',
        email : '',
        senha : ''
    }

    const [objUsuario, setObjUsuario] = useState(usuario);

    

    const aoDigitar = (event) =>{
        setObjUsuario({...objUsuario, [event.target.name]: event.target.value});
        console.log(objUsuario)
    }

    function validarUsuario(usuario) {
        for (let prop in usuario) {
        if (!usuario[prop] || usuario[prop].trim() === '') {
            return false;
        }
        }
        return true;
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');

        if (cpf.length !== 11) {
            return false;
        }

        return true;
    }

    function validarDataNascimento(dataDeNascimento) {
        const dataAtual = new Date();
        const dataDeNascimentoFormatada = new Date(dataDeNascimento);
        const idade = dataAtual.getFullYear() - dataDeNascimentoFormatada.getFullYear();
    
        if (idade < 18) {
            return false;
        }
    
        if (idade === 18) {
            if (dataAtual.getMonth() < dataDeNascimentoFormatada.getMonth()) {
                return false;
            }

        if (
            dataAtual.getMonth() === dataDeNascimentoFormatada.getMonth() &&
            dataAtual.getDate() < dataDeNascimentoFormatada.getDate()
            ) {
                return false;
            }
        }
    
        return true;
    }

    const cadastrar = () => {
        if(validarUsuario(objUsuario)){
                if(!validarEmail(objUsuario.email)){
                    alert("Email Invalido!")
                }
                if(!validarDataNascimento(objUsuario.dataNascimento)){
                    alert("É necessario ter 18 anos para criar uma conta!")
                }
                if(!validarCPF(objUsuario.cpf)){
                    alert("CPF Invalido!")
                }
                else{
                    fetch("http://localhost:8081/ntbank/cadastrar", {
                        method:'post',
                        body:JSON.stringify({
                            nome : objUsuario.nome,
                            cpf : objUsuario.cpf.replace(/\D/g, ''),
                            dataNascimento : objUsuario.dataNascimento,
                            email : objUsuario.email,
                            senha : objUsuario.senha
                        }),
                        headers:{
                        "Content-type" : "application/json",
                        "Accept" : "application/json"
                        }
                    })
                    .then(response => {
                        if(response.status == 409){
                            return response.text().then((data) => {
                                alert(data);
                                throw new Error(data);
                            });
                        }
                        if(response.status == 201){
                            alert("Conta criada com sucesso!")
                            window.location.href = "http://localhost:3000/login"
                        }
                    })
                    .then(data => console.log(data))
                    .catch(error => console.error(error));
                }
            
        }
        else{
            alert("Preencha todos os campos!")
        }
    }

    return (
        <div className='register'>
            <Nav/>
            <div className='input-container'>
                <h2>Registre-se</h2>
                <div className='inputs'>
                    <Input label ="Nome Completo" type="text" value={objUsuario.nome} placeholder="Nome" name="nome" id="nome" onChange={aoDigitar}/>
                    <Input label ="CPF" type="text" value={objUsuario.cpf} placeholder="CPF" name="cpf" id="cpf" onChange={aoDigitar}/>
                    <Input label ="Email" type="text" value={objUsuario.email} placeholder="Email" name="email" id="email" onChange={aoDigitar}/>
                    <Input label ="Data de Nascimento" type="date" value={objUsuario.dataNascimento} placeholder="Data de Nascimento" name="dataNascimento" id="dataNascimento" onChange={aoDigitar}/>
                    <Input label ="Senha" type="password" value={objUsuario.senha} placeholder="Senha" name="senha" id="senha" onChange={aoDigitar}/>
                </div>
                <Send action={cadastrar} funcao="Registrar" content="Já tem uma conta? " redirect="Login" onClickRed={redirect}/>
            </div>
        </div>
    )
}

export default Register;