// import * as React from 'React';
import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import Box from '@mui/material/Box';
import {Stack, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import React, {useState} from "react";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type Props = {
    quantity: number,
    setQuantity:  React.Dispatch<React.SetStateAction<number>>,
    stock: number
}

export default function ProductDetailQuantitySelector({quantity, setQuantity, stock}: Props) {
    const [hasCovertedInvalidChar , setHasCovertedInvalidChar] = useState<boolean>(false);

    const handleMinusButtonClick = () => {
        if (quantity > 1) {
            setQuantity((prevState) => (prevState - 1));
        }
    }

    const handlePlusButtonClick = () => {
        if(hasCovertedInvalidChar) {
            setHasCovertedInvalidChar(false);
            return;
        }
        if (stock > quantity) {
            setQuantity((prevState) => (prevState + 1));
        }
    }

    const handlePlusButtonMouseDown = () => {
        if(hasCovertedInvalidChar) {
            setHasCovertedInvalidChar(false);
        }
    }

    const handleBlur = (event) => {
        let value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            setHasCovertedInvalidChar(true);
            value = 1;
        }
        setQuantity(value);
    };


    const handleChange = (event) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === "" || regex.test(event.target.value)) {
            setQuantity(event.target.value);
        // if (event.target.value === "" || regex.test(event.target.value)) {
        //     const value = parseInt(event.target.value);
        //     setQuantity(isNaN(value) ? "" : value);
        }
    };


        if (stock > 0) {
            return (
                <>
                    <Stack sx={{alignItems: 'center', justifyContent: 'center'}} spacing={1} direction="column">
                        <Stack sx={{alignItems: 'center', justifyContent: 'center'}} spacing={1} direction="row">
                            <Button variant="text" size="small" onClick={handleMinusButtonClick}>
                                <RemoveCircleOutlineOutlinedIcon fontSize='large'/>
                            </Button>
                            <TextField
                                size="small"
                                sx={{width: 60}}
                                inputProps={{maxLength: 3}}
                                type="text"
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                value={quantity}
                                id="quantity"
                                label=""
                                variant="outlined"
                                defaultValue="1"
                            />
                            <Button variant="text" size="small" onClick={handlePlusButtonClick}
                                    onMouseDown={handlePlusButtonMouseDown}>
                                <AddCircleOutlineOutlinedIcon fontSize='large' color='secondary'/>
                            </Button>
                        </Stack>
                        <Typography sx={{flex: 1, textAlign: 'center'}}><h3>In Stock!</h3></Typography>
                        <Button variant="contained" size="large" color="error" endIcon={<AddShoppingCartIcon/>}>
                            Add To Cart
                        </Button>
                    </Stack>
                </>
            )
        } else {
            return (
                <>
                    <Stack sx={{alignItems: 'center', justifyContent: 'center'}} spacing={1} direction="column">
                        <Stack sx={{alignItems: 'center', justifyContent: 'center'}} spacing={1} direction="row">
                            <Button disabled variant="text" size="small">
                                <RemoveCircleOutlineOutlinedIcon fontSize='large'/>
                            </Button>
                            <TextField
                            disabled
                            size="small"
                            sx={{width: 60 }}
                            inputProps={{maxLength: 3}}
                            type="text"
                            value="0"
                            id="quantity"
                            label=""
                            variant="outlined"
                            defaultValue="0"
                            />
                            <Button disabled variant="text" size="small">
                                <AddCircleOutlineOutlinedIcon fontSize='large' />
                            </Button>
                        </Stack>
                        <Typography sx={{flex: 1, textAlign: 'center'}}><h3>Out of Stock</h3></Typography>
                        <Button disabled variant="contained" size="large" color="error" endIcon={<AddShoppingCartIcon/>}>
                            Add To Cart
                        </Button>
                    </Stack>
                </>
            );
        }
}