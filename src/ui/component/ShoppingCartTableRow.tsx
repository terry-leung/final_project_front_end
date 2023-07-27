import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import {IconButton, TableRow} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useEffect, useState} from "react";
import ProductDetailQuantitySelector from "./ProductDetailQuantitySelector.tsx";
import {CartItemDto} from "../../data/dto/CartItemDto.ts";
import * as CartItemApi from "../../api/CartItemApi.ts"

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type Props = {
    cartItemDto : CartItemDto,
    cartItemDtos : CartItemDto[],
    setCartItemDtos: React.Dispatch<React.SetStateAction<CartItemDto[] | undefined>>
};

export default function ShoppingCartTableRow({cartItemDto, cartItemDtos, setCartItemDtos}: Props) {
    const [quantity, setQuantity] = useState<number>(cartItemDto.cart_quantity);
    //set state for notifications

    const updateDtoList = (updatedCartItemDto: CartItemDto) => {
        const updatedDtoList = cartItemDtos.map((value:CartItemDto) => {
            if (value.pid === updatedCartItemDto.pid){
                return updatedCartItemDto;
            } else {
                return value;
            }
        });
        return updatedDtoList;
    }

    const handleQuantityUpdate = async () => {
        const updatedCartItemDto = await CartItemApi.patchCartItemQuantity(cartItemDto.pid, quantity);
        setCartItemDtos(updateDtoList(updatedCartItemDto));
    }

    const handleDeleteCartItem = async () => {
        try {
            await CartItemApi.deleteCartItem(cartItemDto.pid);
            // 'filter' return boolean
            const updatedDtoList = cartItemDtos.filter((value: CartItemDto) =>{
                return value.pid !== cartItemDto.pid;
            });
            setCartItemDtos(updatedDtoList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        handleQuantityUpdate();
    },[quantity])

    const calculateSubtotal = () => {
        return (
            cartItemDto.price * cartItemDto.cart_quantity
        )
    }

    return (
        <StyledTableRow key={cartItemDto.pid}>
            <TableCell align="center" component="th" scope="row">
                <img src={cartItemDto.image_url} height="50px" alt="product" />
            </TableCell>
            <TableCell align="center">{cartItemDto.name}</TableCell>
            <TableCell align="center">${cartItemDto.price.toLocaleString()}</TableCell>
            <TableCell align="center">
                <ProductDetailQuantitySelector stock={cartItemDto.stock} quantity={quantity} setQuantity={setQuantity}/>
            </TableCell>
            <TableCell align="center">${calculateSubtotal().toLocaleString()}</TableCell>
            <TableCell align="center">
                <IconButton onClick={handleDeleteCartItem} aria-label="delete" size="small" color="inherit"><DeleteForeverIcon/></IconButton>
            </TableCell>
        </StyledTableRow>
    );
}