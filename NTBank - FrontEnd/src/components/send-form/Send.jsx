import React from 'react';

import './Send.css';

function Send({funcao, content, redirect, action, onClickRed}) {
    return(
        <div className='send'>
            <button type="submit" onClick={action}>{funcao}</button>
            <p>{content} <span onClick={onClickRed}>{redirect}</span></p>
        </div>
    );
}

export default Send;