import NavBar from "../../component/NavBar";
import ShoppingCartTable from "../../component/ShoppingCartTable.tsx";


export default function ShoppingCartPage() {
    document.title = "Harmony Haven - Shopping Cart";
    return (
        <>
            <NavBar/>
            <ShoppingCartTable/>
        </>
    )
}