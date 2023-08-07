import getEnvConfig from "../Config/EnvConfig.ts";
import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import {TransactionDto} from "../data/dto/TransactionDto.ts";

const baseUrl = getEnvConfig().baseUrl;

async function getConfig() {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error();
    }
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}

export const postTransaction = async () => {
    try {
        const config = await getConfig();
        const response = await axios.post<TransactionDto>(
            `${baseUrl}/transaction/prepare`,
            null,
            config
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTransactionByTid(tid: string) {
    try {
        const config = await getConfig();
        const response = await axios.get<TransactionDto>(
            `${baseUrl}/transaction/${tid}`,
            config
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function payTransaction(tid: string) {
    try {
        const config = await getConfig();
        await axios.patch(
            `${baseUrl}/transaction/${tid}/pay`,
            null,
            config
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function finishTransaction(tid: string) {
    try {
        const config = await getConfig();
        const response = await axios.patch<TransactionDto>(
            `${baseUrl}/transaction/${tid}/finish`,
            null,
            config
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}