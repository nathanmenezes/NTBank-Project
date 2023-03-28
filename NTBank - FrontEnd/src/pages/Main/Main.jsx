import React from 'react';
import logo from "../../images/logo.png"
import mainImg from "../../images/main-image.png"
// import { Container } from './styles';
import "./Main.css"

function Main() {

    function redirectCad(){
        window.location.href = "http://localhost:3000/cadastrar";
    }

    function redirectLogin(){
        window.location.href = "http://localhost:3000/login";
    }

    return(
        <div>
            <nav className='nav-bar'>
                <img src={logo} alt="" />
                <div className='nav-texts'>
                    <a>Home</a>
                    <a>Beneficios</a>
                    <a>Sobre Nós</a>
                </div>
                <div className='nav-buttons'>
                    <button id='btn-cad' onClick={redirectCad}>Quero ser um NT</button>
                    <button id='btn-login' onClick={redirectLogin}>Já sou um NT</button>
                </div>
            </nav>
            <main>
                <div className='main'>
                    <div className='main-texts'>
                        <h1>Seja um “NT” e tenha acesso a varios beneficios!</h1>
                        <button onClick={()=>{
                            window.location.href = "http://localhost:3000/cadastrar"
                        }}>Abrir minha conta agora!</button>
                    </div>
                    <img src={mainImg} alt="" />
                </div>
            </main>
        </div>
    );
}

export default Main;


