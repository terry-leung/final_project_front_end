import {createHashRouter, RouterProvider} from "react-router-dom";
// import React from "react";
import ProductListingPage from "./ui/page/ProductListingPage";
import ErrorPage from "./ui/page/ErrorPage";
import {createContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"
import {UserData} from "./data/UserData.ts";
import LoginPage from "./ui/page/LoginPage";
// import ScrollToTop from "./ui/component/ScrollToTop.tsx";
import ProductDetailPage from "./ui/page/ProductDetailPage";
import ShoppingCartPage from "./ui/page/ShoppingCartPage";

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);

export default function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

    useEffect( () => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    },[])

    const router = createHashRouter([
        {
            path: "/",
            element: <ProductListingPage/>
        },
        {
            path: "/product/:productId",
            element: <ProductDetailPage/>
        },
        {
            path: "/shoppingcart",
            element: <ShoppingCartPage/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        // {
        //     path: "/checkout/:transactionId",
        //     element: <Checkout/>
        // },
        // {
        //     path: "/thankyou",
        //     element: <ThankYou/>
        // }
        {
            path: "/error",
            element: <ErrorPage/>
        },
        {
            path: "*",
            element: <ErrorPage/>
        }
    ])

    return (
        <LoginUserContext.Provider value={loginUser}>
            <RouterProvider router={router} />
            {/*    <ScrollToTop/>*/}
            {/*</RouterProvider>*/}
        </LoginUserContext.Provider>
    )
}