import React, {useState} from 'react';
import {Link, Typography, TextField, Button,  Grid} from '@mui/material';
import {useUser} from '../hooks/useUser';

const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const {onLog} = useUser();
    return (
        <Grid container item className="auth-form" xs={10} sm={7} md={3} container direction="column" justifyContent="center" alignItems="center">
            <TextField
                type="phone"
                helperText="Please enter your phone"
                label="Phone"
                value = {phone}
                onChange = {e => setPhone(e.target.value)}
            />
            <TextField
                type="password"
                helperText="Please enter your password"
                label="Password"
                value = {password} onChange = {e => setPassword(e.target.value)}
            />
            <Button disabled = {!phone || !password} size="large" variant="outlined" onClick = {() => onLog(phone, password)}>Log in</Button>
            <Typography>Don't have an account yet? <Link variant="body2" underline="none" href="/registration"> Sign up</Link></Typography>
        </Grid>
    );
};

export default LoginForm;
