import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import {Icon, TableRow} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, {useState} from "react";
import ProductDetailQuantitySelector from "./ProductDetailQuantitySelector.tsx";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type Props = {
    row: {
        imageUrl: string;
        name: string;
        price: number;
        quantity: number;
        stock: number;
        subtotal: number;
    };
};

export default function ShoppingCartTableRow(props: Props) {
    const { row } = props;
    const [quantity, setQuantity] = useState<number>(row.quantity);
    return (
        <StyledTableRow key={row.imageUrl}>
            <TableCell align="center" component="th" scope="row">
                <img src={row.imageUrl} height="50px" alt="product" />
            </TableCell>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">${row.price.toLocaleString()}</TableCell>
            <TableCell align="center">
                <ProductDetailQuantitySelector stock={row.stock} quantity={quantity} setQuantity={setQuantity}/>
            </TableCell>
            <TableCell align="center">${row.subtotal.toLocaleString()}</TableCell>
            <TableCell align="center">
                <Icon><DeleteForeverIcon/></Icon>
            </TableCell>
        </StyledTableRow>
    );
}