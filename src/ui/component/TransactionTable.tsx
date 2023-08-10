import {
    Button, Grid,
    Paper,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {TransactionDto} from "../../data/dto/TransactionDto.ts";
import TransactionTableRow from "./TransactionTableRow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../api/TransactionApi.ts"

type Params = {
    transactionId: string | undefined
}
export default function TransactionTable() {
    const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined);
    const params = useParams<Params>();
    const navigate = useNavigate();

    const getTransactionByTid = async () => {
        try {
            if (params.transactionId) {
                const data = await TransactionApi.getTransactionByTid(params.transactionId);
                setTransactionDto(data);
            } else {
                navigate("/error");
            }
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect( () =>{
        getTransactionByTid();
    }, [])

    const handleCheckout = async () => {
        try {
            if (params.transactionId) {
                await TransactionApi.payTransaction(params.transactionId);
                await TransactionApi.finishTransaction(params.transactionId);
                navigate("/thankyou");
            } else {
                navigate("/error");
            }
        } catch (error) {
            navigate("/error");
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const renderCheckoutTable = () => {
        if (transactionDto) {
            return (
                <>
                    {
                        transactionDto.items.map((value) => (
                        <TransactionTableRow key={value.tpid} item={value} />
                    ))
                    }
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }


    return (
        <>
            <Grid style={{marginTop: 50}} item xs={12}>
                <Typography variant="h5" align="center">Checkout</Typography>
                <br/>
                {/*<Divider />*/}
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ maxWidth: 1300 , margin: 'auto'}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Product</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Unit Price</StyledTableCell>
                                <StyledTableCell align="center">Quantity</StyledTableCell>
                                <StyledTableCell align="center">Subtotal</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                renderCheckoutTable()
                            }
                            <TableRow>
                                <TableCell align="center">
                                    {
                                        transactionDto ? (
                                                <>
                                                </>
                                            ) :
                                            transactionDto === undefined ? (
                                                    <>
                                                    </>
                                                ) :
                                                (
                                                    <Typography variant="h6">
                                                        No item found
                                                    </Typography>
                                                )
                                    }
                                </TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                    {
                                        transactionDto ? (
                                                <>
                                                </>
                                            ) :
                                            transactionDto === undefined ? (
                                                    <Typography variant="h6">
                                                        Loading
                                                    </Typography>
                                                ) :
                                                (
                                                    <>
                                                    </>
                                                )
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6">
                                        Total:
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6">
                                        {
                                            transactionDto ? (
                                                <>
                                                ${transactionDto.total}
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        transactionDto ? (
                                            <>
                                                <Button onClick={handleCheckout} variant="contained" size="small" color="error">
                                                    Checkout
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    )
}