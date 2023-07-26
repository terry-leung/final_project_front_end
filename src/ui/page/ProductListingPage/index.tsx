import NavBar from "../../component/NavBar";
import './style.css'
// import {useLocation} from "react-router-dom";
import ProductItem from "../../component/ProductItem.tsx";
import mockData from "./response.json"
import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/dto/ProductListDto.ts";
import axios from "axios";
import LoadingContainer from "../../component/LoadingContainer.tsx";
// import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import AdvertisingBanner from "../../component/AdvertisingBanner.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import ProductListCarousel from "../../component/ProductListCarousel.tsx";
// import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"

export default function ProductListingPage() {
    const [productListData, setProductListData] = useState<ProductListDto[] | undefined>(undefined);
    const navigate = useNavigate();

    const getProductListData = async () => {
        try {
            setProductListData(await ProductApi.getAllProduct());
        } catch (err) {
            navigate("/error");
        }
    }
    // const location = useLocation();

    useEffect(() => {
        getProductListData();

        // setTimeout(() => {
        //     setProductListData(mockData);
        // }, 3000)

        return () => {
            axios.CancelToken.source().cancel();
        }
    },[])

    const renderCards = () => {
        if(productListData){
            return (
                <>
                    <Grid>
                <Box display="flex">
                    {
                        productListData.map((value) => (
                            <ProductItem key={value.pid} dto={value}/>
                        ))
                    }
                </Box>
                    </Grid>
                </>
            )
        } else {
            return <LoadingContainer/>
        }
    }

    return (
        <Grid>
            <NavBar/>
            <Grid>
            {/*<AdvertisingBanner/>*/}
                {
                    renderCards()
                }
                <ProductListCarousel/>
            </Grid>
        </Grid>
    )
}