import React, { useEffect, useState, Fragment} from 'react';

import styled from 'styled-components'
import variables from '../../variables.module.scss';

const StyledLogin = styled.div`

    input {
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right-color: rgba(255, 255, 255, 0.07);
    border-bottom-color: rgba(255, 255, 255, 0.07);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
    position: relative;
    width: 100%;
    height: 4vh;
    padding: 4%;
    font-size: 1vw;
    letter-spacing: 0.06vw;
    color: rgba(255, 255, 255, 0.8);
    @media(max-width: ${variables.large}){
        background: transparent;
        width: 80%;
        margin: 6vw auto 0 auto;
        display: block;
        border: 0px;
        border-radius: 0;
        border-bottom: 1px solid rgba(255,255,255,0.6);
        font-size: 3vw;
    }
       @media(max-width: ${variables.medium}){
        background: transparent;
        width: 80%;
        margin: 6vw auto 0 auto;
        display: block;
        border: 0px;
        border-radius: 0;
        border-bottom: 1px solid rgba(255,255,255,0.6);
        font-size: 4vw;
    }
    &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    }
    &:focus-visible {
    outline: none;
    color: rgba(255, 255, 255, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.35);
     @media(max-width: ${variables.large}){
        border: 0;
        border-bottom: 1px solid rgba(255,255,255,1);
        }
    }
}`

export const Login = () => {
    return (<StyledLogin>
        <input placeholder="User Name"></input>
        <input placeholder="Password" type="password"></input>
    </StyledLogin>)
}