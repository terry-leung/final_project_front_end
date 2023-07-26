// import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
// import {useNavigate} from "react-router-dom";
// import {useContext, useEffect} from "react";
import NavBar from "../../component/NavBar";
import LoginForm from "../../component/LoginForm.tsx";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";

export default function LoginPage() {
    // const navigate = useNavigate();
    // const loginUser = useContext()
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const isLogin = await FirebaseAuthService.handleSignInWithEmailAndPassword(email);
    //     if (isLogin) {
    //         navigate(-1);
    //     } else {
    //         console.log("login failed")
    //     }
    // }
    //
    // useEffect( () => {
    //     if(loginUser) {
    //         navigate("/");
    //     }
    // }, [loginUser])

    return (
        <Grid>
            <NavBar/>
            <LoginForm/>
        </Grid>
    )
}