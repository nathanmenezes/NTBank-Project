import React, { useEffect, useState } from 'react';
import "./Account.css"
import Logo from "../../images/logo.png"
import Deposit from './AccountFunctions/components/Deposit/Deposit';
import Withdraw from './AccountFunctions/components/Withdraw/Withdraw';
import Transfer from './AccountFunctions/components/Transfer/Transfer';

function Account() {

    const [data, setData] = useState([]);
    const [cryptos, setCryptos] = useState([]);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [valor, setValor] = useState(0);
    const [id, setId] = useState(0);

    const aoDigitar = (event) => {
        setValor(parseFloat(event.target.value));
        console.log(valor, id);
    };

    const aoDigitar2 = (event) => {
        setId(parseInt(event.target.value));
        console.log(valor, id);
    };


    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:8081/ntbank/usuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível carregar os itens.');
                }
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.error(error );
                alert("Faça o login primeiro para acessar essa página!")
                window.location.href = "http://localhost:3000/login"
            });
    }, []);

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {
                method: 'GET'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível carregar os itens.');
                }
            })
            .then(data => {
                setCryptos(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function deposit() {
        if(!valor == 0){
            fetch("http://localhost:8081/ntbank/depositar", {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                valor:valor
            })
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar recurso');
            }
            return response.text();
            })
            .then(response => {
                alert("Você depositou R$" + valor + " com sucesso!")
                let teste = data
                teste.saldo = (data.saldo += valor)
                setData(teste)
                setValor(0)
                setShowDeposit(false)
            })
            .catch(error => {
                console.error('Erro ao atualizar recurso:', error);
            });
        }else{
            alert("Digite um valor valido!")
        }
    }

    function sacar() {
        if(!valor == 0){
            if(valor <= data.saldo){
                fetch("http://localhost:8081/ntbank/sacar", {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valor:valor
                })
                })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar recurso');
                }
                return response.text();
                })
                .then(response => {
                    alert("Você sacou R$" + valor + " com sucesso!")
                    let teste = data
                    teste.saldo = (data.saldo -= valor)
                    setData(teste)
                    setValor(0)
                    setShowWithdraw(false)
                })
                .catch(error => {
                    console.error('Erro ao atualizar recurso:', error);
                });
            }else{
                alert("Saldo Insuficiente!")
            }
        }else{
            alert("Digite um valor valido!")
        }
    }

    function showDepositFunction() {
        setShowDeposit(true);
    }

    function showWithdrawFunction() {
        setShowWithdraw(true);
    }

    function showTransferFunction(){
        setShowTransfer(true);
    }

    function disapearFunction(){
        setShowDeposit(false);
        setShowWithdraw(false);
        setShowTransfer(false);
    }

    function logout() {
        sessionStorage.removeItem('token')
        window.location.href = 'http://localhost:3000/';
    }

    function transferir(){
        if(valor <= data.saldo){
            fetch("http://localhost:8081/ntbank/transferir", {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:id,
                valor:valor
            })
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('ERROR: ');
            }
            return response.text();
            })
            .then(response => {
                alert("Você Transferiu R$" + valor + " com sucesso!")
                let teste = data
                teste.saldo = (data.saldo -= valor)
                setData(teste)
                setValor(0)
                setShowTransfer(false)
            })
            .catch(error => {
                alert('Preencha todos os campos!');
            });
        }else{
            alert("Saldo Insuficiente!")
        }
    }
    
    return (
        <div className='account'>
            <div className='left-section'>
                <div className='image'>
                    <img src={Logo} alt="" />
                </div>
                <div className='username-logout'>
                    {data && data.cliente ? (
                        <h3>{data.cliente.nome}</h3>
                    ) : (
                        <p>Carregando...</p>
                    )}
                    <p onClick={logout}>
                        Deslogar
                    </p>
                </div>
                <div className='actions'>
                    <a onClick={showTransferFunction}>Transferir</a>
                    <a onClick={showDepositFunction}>Depositar</a>
                    <a onClick={showWithdrawFunction}>Sacar</a>
                </div>
            </div>
            <div className='mid-section'>
                <div className='account-details'>
                    <div className='details-top'>
                        <p>Conta Principal</p>
                        <p>Saldo Disponivel</p>
                    </div>
                    <div className='details-mid'>
                        <div className='user-details'>
                            {data && data.cliente ? (
                                <h3>Olá {data.cliente.nome}</h3>
                            ) : (
                                <p>Carregando...</p>
                            )}
                            {data && data.cliente ? (
                                <p>Número da Conta: {data.cliente.id}</p>
                            ) : (
                                <p>Carregando...</p>
                            )}
                        </div>
                        <h3 className='money'>
                            {data && data.cliente ? (
                                <p><span className='rs'>R$</span> {data.saldo}</p>
                            ) : (
                                <p>Carregando...</p>
                            )}
                        </h3>
                    </div>
                    <div className='action-buttons'>
                        <button onClick={showTransferFunction}>Transferir Dinheiro</button>
                        <button onClick={showWithdrawFunction}>Sacar Dinheiro</button>
                        <button onClick={showDepositFunction}>Depositar Dinheiro</button>
                        {showDeposit && <Deposit onClick={disapearFunction} deposit={deposit} onChange={aoDigitar}/>}
                        {showWithdraw && <Withdraw onClick={disapearFunction} withdraw={sacar} onChange={aoDigitar}/>}
                        {showTransfer && <Transfer onClick={disapearFunction} transfer={transferir} onChange={aoDigitar} onChange2={aoDigitar2}/>}
                    </div>
                </div>
                <div className='transactions-container'>
                    <div className='transactions-top'>
                        <h3>
                            Transações Recentes
                        </h3>
                    </div>
                    <div className='transaction'>
                        <p className='transaction-title'>Total Gasto: </p>
                        <div className='transactions'>
                            <div className='transactions-header'>
                                <h3>Transação</h3>
                                <h3>Saida</h3>
                            </div>
                            <div className='transactions-content'>
                                {data && data.transacoes && data.transacoes.map((transaction) => (
                                    <div className='transaction-activity' key={transaction.id}>
                                        <p>{transaction.descricao}</p>
                                        <p>{transaction.valor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='right-section'>
                {cryptos && cryptos[0] ? (
                    <div className='crypto-container'>
                        <div className='crypto-info'>
                            <img src={cryptos[0].image} alt="" />
                            <h2>{cryptos[0].name}</h2>
                        </div>
                        <div className='crypto-price'>
                            <p>
                                Preço
                            </p>
                            <h3>
                                <span className='rs'>R$ </span>{cryptos[0].current_price}
                            </h3>
                        </div>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
                {cryptos && cryptos[1] ? (
                    <div className='crypto-container'>
                        <div className='crypto-info'>
                            <img src={cryptos[1].image} alt="" />
                            <h2>{cryptos[1].name}</h2>
                        </div>
                        <div className='crypto-price'>
                            <p>
                                Preço
                            </p>
                            <h3>
                                <span className='rs'>R$ </span>{cryptos[1].current_price}
                            </h3>
                        </div>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
                {cryptos && cryptos[2] ? (
                    <div className='crypto-container'>
                        <div className='crypto-info'>
                            <img src={cryptos[2].image} alt="" />
                            <h2>{cryptos[2].name}</h2>
                        </div>
                        <div className='crypto-price'>
                            <p>
                                Preço
                            </p>
                            <h3>
                                <span className='rs'>R$ </span>{cryptos[2].current_price}
                            </h3>
                        </div>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
}

export default Account;