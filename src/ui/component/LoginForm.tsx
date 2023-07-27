import {Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../App.tsx"
import {GoogleLoginButton} from "react-social-login-buttons";


export default function LoginForm() {
    const loginFormStyle = () => (
        {padding: "30px 30px 70px 30px",
            width: 280,
            position: "relative",
            margin: "auto",
            borderRadius: 4,
        });

    // const textField = () => (
    //     {paddingBottom: 2,
    //         borderRadius: "0"
    //     });

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loginUser = useContext(LoginUserContext);

    const handleEmailOnChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        const isLogin = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (isLogin) {
            setErrorMessage("")
            navigate(-1);
        } else {
            setErrorMessage("*Incorrect E-mail or password.");
            console.log("login failed")
        }
    }

    const handleGoogleSignin = async () => {
        const isLogin = await FirebaseAuthService.handleSignInWithGoogle();
        if (isLogin) {
            navigate(-1);
        } else {
            console.log("login failed")
        }
    }

    useEffect(() => {
        if(loginUser){
            navigate("/");
        }
    }, [loginUser])

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            minWidth="100%"
            marginTop="calc(2% + 7vh)"
        >
                <Paper elevation={10} sx={loginFormStyle()}>
                    <form onSubmit={handleSubmit}>
                    <Grid>
                        <Avatar>A</Avatar>
                        <Typography><h3>Sign in</h3></Typography>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <TextField sx={{paddingBottom: 3}} value={email} label='E-mail' placeholder='Enter Email Address' onChange={handleEmailOnChange} fullWidth required/>
                    <TextField sx={{paddingBottom: 2}} value={password} label='Password' placeholder='Enter password' type='password' onChange={handlePasswordOnChange} fullWidth required/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Button sx={{marginTop: 2, marginBottom: 1}} type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
                    <hr/>
                    <GoogleLoginButton onClick={handleGoogleSignin} fullWidth />
                    </form>
                </Paper>
        </Grid>
    )
}