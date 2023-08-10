import NavBar from "../../component/NavBar";
import './style.css'
import ProductItem from "../../component/ProductItem.tsx";
import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/dto/ProductListDto.ts";
import axios from "axios";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";

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

    useEffect(() => {
        getProductListData();


        return () => {
            axios.CancelToken.source().cancel();
        }
    },[])

    const renderCards = () => {
        if(productListData){
            document.title = "Harmony Haven";
            return (
                <>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{marginTop: 30}}>
                        <Grid container spacing={5} maxWidth={1200} sx={{margin: '0 auto'}}>
                    {
                        productListData.map((value) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={value.pid} sx={{marginBottom: 4}}>
                            <ProductItem key={value.pid} dto={value}/>
                            </Grid>
                        ))
                    }
                        </Grid>
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
                {
                    renderCards()
                }
            </Grid>
        </Grid>
    )
}