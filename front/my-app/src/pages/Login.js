import React, {useState} from 'react';
import styled from 'styled-components';
import {Form, Button} from 'react-bootstrap';
import {useUser} from '../hooks/useUser';

const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const {onLog} = useUser();
    return (
        <>
            <Form className="w-50 mx-auto mt-6">
                <Form.Group className="mb-3" controlId="formNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="phone" placeholder="Enter phone"  value = {phone} onChange = {e => setPhone(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formcPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="dark" disabled = {!phone || !password} onClick = {() => onLog(phone, password)}>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;

const LogForm  = styled.div`
  width: 20%;
  padding: 8% 0 0;
  margin: auto;
  //div {
  //  position: relative;
  //  z-index: 1;
  //  background: #FFFFFF;
  //  padding: 45px 45px 35px 45px;
  //  text-align: center;
  //  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  //}
  //input {
  //  font-family: "Roboto", sans-serif;
  //  outline: 0;
  //  background: #f2f2f2;
  //  width: 100%;
  //  border: 0;
  //  margin: 0 0 15px;
  //  padding: 15px;
  //  box-sizing: border-box;
  //  font-size: 14px;
  //}
  //button {
  //  font-family: "Roboto", sans-serif;
  //  text-transform: uppercase;
  //  outline: 0;
  //  background: #a8bfdd;
  //  width: 100%;
  //  border: 0;
  //  padding: 15px;
  //  color: #FFFFFF;
  //  font-size: 14px;
  //  cursor: pointer;
  //}
  //a {
  //  padding-top: 10px;
  //  color: rgba(0,149,246,1);;
  //}
  //p {
  //  margin: 20px auto;
  //}
  //button:hover,button:active, button:focus {
  //  background: #97abc4;
  //}
`;

