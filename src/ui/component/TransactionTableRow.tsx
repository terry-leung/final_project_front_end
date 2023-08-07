import TableCell from "@mui/material/TableCell";
import {TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";
import {TransactionProductDto} from "../../data/dto/TransactionDto.ts";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type Props = {
    item: TransactionProductDto
}

export default function TransactionTableRow({item}: Props) {
    return(
        <StyledTableRow key={item.tpid}>
            <TableCell align="center" component="th" scope="row">
                <img src={item.product.image_url} height="50px" alt="product" />
            </TableCell>
            <TableCell align="center">{item.product.name}</TableCell>
            <TableCell align="center">${item.product.price.toLocaleString()}</TableCell>
            <TableCell align="center">
                {item.quantity}
            </TableCell>
            <TableCell align="center">${item.subtotal}</TableCell>
            <TableCell align="center">
                {/*<IconButton onClick={handleDeleteCartItem} aria-label="delete" size="small" color="inherit"><DeleteForeverIcon/></IconButton>*/}
            </TableCell>
        </StyledTableRow>
    )
}