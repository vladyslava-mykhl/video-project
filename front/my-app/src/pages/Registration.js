import React, {useState} from 'react';
import styled from 'styled-components';
const axios = require('axios');

const RegistrationForm = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [username, setUsername] = useState('')
    const onReg = (phone, password, username) => {
        try {
            axios.post('http://localhost:3000/registration', {
                phone,
                password,
                username
            }).then(response => console.log(response)).catch(error => alert(error.response.data.error));
        } catch (e) {
            alert(e)
        }
    }
    return (
        <RegistrForm >
            <div>
                <input type="phone" placeholder="Enter phone" value={phone}
                       onChange={e => setPhone(e.target.value)}/>
                <input type="username" placeholder="Enter username" value={username}
                       onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="Enter password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Repeat password" value={passwordRepeat}
                       onChange={e => setPasswordRepeat(e.target.value)}/>
                <button disabled={!phone || !username || !password || passwordRepeat !== password}
                        onClick={() => onReg(phone, password, username)}>Submit
                </button>
                <p>Есть аккаунт?<a href="/login">Вход</a></p>
            </div>
        </RegistrForm >
    )}

export default RegistrationForm;

const RegistrForm  = styled.div`
  width: 20%;
  padding: 8% 0 0;
  margin: auto;
  div {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    padding: 45px 45px 35px 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #a8bfdd;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
  }
  a {
    padding-top: 10px;
    color: rgba(0,149,246,1);;
  }
  p {
    margin: 20px;
  }
  button:hover,button:active, button:focus {
    background: #97abc4;
  }
`;

//export const ConnectRegistrForm = connect(null, {onReg:actionFullRegister}) (RegistrForm)

