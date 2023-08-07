import NavBar from "../../component/NavBar";
import ShoppingCartTable from "../../component/ShoppingCartTable.tsx";
// import {useState} from "react";
// import {CartItemDto} from "../../../data/dto/CartItemDto.ts";


export default function ShoppingCartPage() {
    document.title = "Harmony Haven - Shopping Cart";
    return (
        <>
            <NavBar/>
            <ShoppingCartTable/>
        </>
    )
}