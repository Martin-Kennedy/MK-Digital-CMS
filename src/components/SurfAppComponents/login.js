import React, { useEffect, useState, Fragment} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components'
import variables from '../../variables.module.scss';
import {getSurferCredentials} from '../../actions/surfApp.actions';

const StyledLogin = styled.div`

    input, input[type="password"] {
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.04) !important;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-right-color: rgba(255, 255, 255, 0.07);
    border-bottom-color: rgba(255, 255, 255, 0.07);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.07);
    position: relative;
    outline:0;
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

const mapStateToProps = state => {
    return {
        initialUtility: {
            session: state.initialUtility.session,
            keystoneToken: state.initialUtility.keystoneToken
        },
        surf: {
            surferUserCredentials: state.surf.surferUserCredentials
        }
    }
}


const mapDispatchToProps = dispatch => ({
    getSurferCredentials: (token, email, password) => dispatch(getSurferCredentials(token, email, password))
});

export const LoginComponent = (props) => {
   
    const [state, setState] = useState({
    email: "",
    userName: ""
  });

const { getSurferCredentials } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSurferCredentials(props.initialUtility.keystoneToken, state.userName, state.email)
  };

  return (
    <StyledLogin>
      <form onSubmit={handleSubmit}>
        <div >
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={state.userName}
            onChange={handleInputChange}
          />
        </div>
        <div >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div >
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </StyledLogin>)
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);