import React, {useState} from 'react';
import {useUser} from '../hooks/useUser';
import { Link, Typography, TextField, Button, Grid} from '@mui/material';

const RegistrationForm = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [username, setUsername] = useState('');
    const {onReg} = useUser();
    return (
        <Grid container item className="auth-form" xs={10} sm={7} md={3} direction="column" justifyContent="center" alignItems="center">
            <TextField
                type="phone"
                helperText="Please enter your phone"
                label="Phone"
                value = {phone}
                onChange = {e => setPhone(e.target.value)}
           />
            <TextField
                helperText="Please enter your username"
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                type="password"
                helperText="Please enter your password"
                label="Password"
                value = {password}
                onChange = {e => setPassword(e.target.value)}
            />
            <TextField
                type="password"
                helperText="Please repeat your password"
                label="Password"
                value = {passwordRepeat}
                onChange={e => setPasswordRepeat(e.target.value)}
            />
            <Button disabled={!phone || !username || !password || passwordRepeat !== password} size="large" variant="outlined" onClick={() => onReg(phone, password, username)}>
                Sign up
            </Button>
            <Typography>Have an account?<Link variant="body2" underline="none" href="/login"> Log in</Link></Typography>
        </Grid>
    );
};

export default RegistrationForm;

