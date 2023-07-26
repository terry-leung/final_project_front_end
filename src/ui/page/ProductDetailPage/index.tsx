import NavBar from "../../component/NavBar";
import ProductDetailForm from "../../component/ProductDetailForm.tsx";
// import mockData from "./response.json"
import {useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/dto/ProductDetailDto.ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as ProductApi from "../../../api/ProductApi.ts";

type Params = {
    productId: string
}

export default function ProductDetailPage() {
    const [productDetailData, setProductDetailData] = useState<ProductDetailDto | undefined>(undefined);
    const {productId} = useParams<Params>();
    const navigate = useNavigate();

    const getProductDetail = async (pid: string) => {
        try {
            setProductDetailData(await ProductApi.getProductDetail(pid));
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        if(productId){
            setProductDetailData(undefined);
            getProductDetail(productId);
        } else {
            navigate(("/error"))
        }
    }, [productId])

    const renderProductDetailPage = () => {
        if (productDetailData) {
            return (
                <ProductDetailForm productDetailData={productDetailData}/>
            )
        } else {
            <LoadingContainer/>
        }
    }

    return (
        <>
            <NavBar/>
            {
                renderProductDetailPage()
            }
        </>
    )
}