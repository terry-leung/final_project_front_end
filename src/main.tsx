// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import * as FirebaseAuthService from './authService/FirebaseAuthService.ts'
// import {BrowserRouter} from "react-router-dom";
// import {CssBaseline} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// favicon + title + solve 404 by react router

FirebaseAuthService.serviceInit();

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    //     <BrowserRouter>
        <App/>
        // </BrowserRouter>,
    // </React.StrictMode>,
)
