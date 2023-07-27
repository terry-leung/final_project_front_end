import axios from "axios";
import {ProductListDto} from "../data/dto/ProductListDto.ts";
import {ProductDetailDto} from "../data/dto/ProductDetailDto.ts";
import getEnvConfig from "../Config/EnvConfig.ts";
// import {useNavigate} from "react-router-dom";

// const baseUrl = "http://localhost:8080"
const baseUrl = getEnvConfig().baseUrl;

export async function getAllProduct() {
    try {
        const response = await axios.get<ProductListDto[]>(`${baseUrl}/public/product`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getProductDetail(pid: string) {
    try {
        const response = await axios.get<ProductDetailDto[]>(`${baseUrl}/public/product/${pid}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}