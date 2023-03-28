import React, { useState } from 'react';
import Input from '../../components/form-input/Input';
import Send from '../../components/send-form/Send';

import "./Login.css"
import loginImage from "../../images/login-image.png"
import Nav from '../../components/nav-bar2/Nav';

function Login() {

    const usuario = {
        email : '',
        senha : ''
    }

    const [objUsuario, setObjUsuario] = useState(usuario);
    const aoDigitar = (event) =>{
        setObjUsuario({...objUsuario, [event.target.name]: event.target.value});
        console.log(objUsuario)
    }


    function logar() {
        fetch('http://localhost:8081/ntbank/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: objUsuario.email,
                    senha: objUsuario.senha
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed.');
                }
            })
            .then(data => {
                const token = data.token; // atribuição do valor à variável local
                sessionStorage.setItem('token', token); // armazena o token na sessionStorage
                window.location.href = "http://localhost:3000/conta"
            })
            .catch(error => {
                alert("Credenciais Invalidas!")
                console.error(error);
            });
    }

    function redirect(){
        window.location.href = "http://localhost:3000/cadastrar"
    }



    return(
        <div className='login'>
            <Nav/>
            <div className='login-main'>
                <img src={loginImage} alt=""/>
                <div className='form'>
                    <div className='form-inputs'>
                    <Input label ="Email" type="text" value={objUsuario.email} placeholder="Email" name="email" id="email" onChange={aoDigitar}/>
                    <Input label ="Senha" type="password" value={objUsuario.senha} placeholder="Senha" name="senha" id="senha" onChange={aoDigitar}/>
                    </div>
                    <Send action={logar} funcao="Login" content="Não tem nenhuma conta? " redirect="Registre-se" onClickRed={redirect}/>
                </div>
            </div>
            
        </div>
    )
}

export default Login;