import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody, TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material/styles";
import ShoppingCartTableRow from "./ShoppingCartTableRow.tsx";
import {useEffect, useState} from "react";
import {CartItemDto} from "../../data/dto/CartItemDto.ts";
import mockData from "./response.json"
// import React from "react";

export default function ShoppingCartTable() {
    const [cartItemDtos, setCartItemDtos] = useState<CartItemDto [] | undefined>(undefined);

    useEffect( () => {
        setCartItemDtos(undefined);
        setTimeout( () => {
            setCartItemDtos(mockData);
        }, 3000)
    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const calculateTotal = () => {
        if (cartItemDtos) {
            return cartItemDtos.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.cart_quantity;
            }, 0);
        } else {
            return 0;
        }
    }

    // const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //     '&:nth-of-type(odd)': {
    //         backgroundColor: theme.palette.action.hover,
    //     },
    //     // hide last border
    //     '&:last-child td, &:last-child th': {
    //         border: 0,
    //     },
    // }));

    function createData(
        imageUrl: string,
        name: string,
        price: number,
        quantity: number,
        stock: number,
        subtotal: number,
    ) {
        return { imageUrl, name, price, quantity, stock, subtotal };
    }

    // let rows = [];
    //
    // if (cartItemDtos) {
    //     rows = cartItemDtos?.map((item) =>
    //         createData(item.image_url, item.name, item.price, item.cart_quantity, item.price * item.cart_quantity)
    //     );
    // }
        // = [
        // createData('/p01.webp', 159, 6.0, 24, 4.0),
        // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        // createData('Eclair', 262, 16.0, 24, 6.0),
        // createData('Cupcake', 305, 3.7, 67, 4.3),
        // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    const renderShoppingCartTable = () => {
        let rows = [];
        if (cartItemDtos) {
            rows = cartItemDtos?.map((item) =>
                createData(item.image_url, item.name, item.price, item.cart_quantity, item.stock,item.price * item.cart_quantity)
            );
            return (
                <>
                    {rows.map((row) => (
                        <ShoppingCartTableRow key={row.imageUrl} row={row} />
                    ))}
                </>
            )
        } else {
            // {
            //     rows = [
            //         createData('', 'No Items' , 0, 0, 0),
            //     ]
            // }
            return (
                <>
                    {/*{rows.map((row) => (*/}
                    {/*    <ShoppingCartTableRow key={row.imageUrl} row={row} />*/}
                    {/*))}*/}
                </>
            )
        }
    }

    return (
        <>
            <Grid style={{marginTop: 20}}item xs={12}>
                <Typography variant="h5" align="center">Shopping Cart</Typography>
                <br/>
                {/*<Divider />*/}
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 1500 , margin: 'auto'}} aria-label="customized table">
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
                                renderShoppingCartTable()
                            }
                            <TableRow>
                                <TableCell align="center">
                                    {
                                        cartItemDtos ? (
                                                <>
                                                </>
                                            ) :
                                            cartItemDtos === undefined ? (
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
                                        cartItemDtos ? (
                                            <>
                                            </>
                                        ) :
                                            cartItemDtos === undefined ? (
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
                                        ${calculateTotal().toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" size="small" color="error">
                                        Checkout
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
}