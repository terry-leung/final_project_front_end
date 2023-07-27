import * as React from 'react';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {IconButton, Paper, Popper, PopperPlacementType, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {CartItemDto} from "../../data/dto/CartItemDto.ts";
// import mockData from "./response.json"
import {Link} from "react-router-dom";
import ShoppingCartListItem from "./ShoppingCartListItem.tsx";
// import {toLocaleString} from "localforage";
import * as CartItemApi from "../../api/CartItemApi.ts"

export default function ShoppingCartList() {
    const [cartItemDtos, setCartItemDtos] = useState<CartItemDto[] | undefined>(undefined);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();

    const getAllCartItems = async () => {
        try{
            const data = await CartItemApi.getAllCartItems();
            setCartItemDtos(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);
            };

    const calculateTotal = () => {
        let total = 0;
        cartItemDtos?.forEach((value) => {
            total += value.price * value.cart_quantity;
        });
        return total.toLocaleString();
    }

    const renderCartPopperList = () => {
        if (cartItemDtos) {
            return (
                <>
                    <Typography variant="h6" sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        backgroundColor: "#FFFFFF",
                        padding: "8px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                <Box>
                    Total: ${calculateTotal()}
                </Box>
                <Box sx={{ textAlign: "right"}}>
                    <Link to={"/shoppingcart"}>
                        <Button variant="contained" size="small" color="secondary">
                            Enter Cart
                        </Button>
                    </Link>
                </Box>
                </Typography>
            <List sx={{ paddingTop: "10px" }} id="popper-list">
                {cartItemDtos?.map((value, index) => (
                    <ShoppingCartListItem key={value.pid} data={value} isLast={index === cartItemDtos.length - 1} />
                ))}
            </List>
                </>
            )
        } else if (cartItemDtos === undefined) {
            return (
                <>
                    <Typography variant="h6" sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        backgroundColor: "#FFFFFF",
                        padding: "8px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Box>
                            Total: $
                        </Box>
                        <Box sx={{ textAlign: "right"}}>
                                <Button disabled variant="contained" size="small" color="secondary">
                                    Enter Cart
                                </Button>
                        </Box>
                    </Typography>
                    <List sx={{ paddingTop: "10px" }} id="popper-list">
                        Loading...
                    </List>
                </>
            )
        } else {
            return (
            <>
                <Typography variant="h6" sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "#FFFFFF",
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box>
                        Total: $ 0
                    </Box>
                    <Box sx={{ textAlign: "right"}}>
                        <Button disabled variant="contained" size="small" color="secondary">
                            Enter Cart
                        </Button>
                    </Box>
                </Typography>
                <List sx={{ paddingTop: "10px" }} id="popper-list">
                    <ListItem>
                        <Typography>
                            No items in the cart.
                        </Typography>
                    </ListItem>
                </List>
            </>
            )
        }
    }

    useEffect(() => {
        if (open) {
            setCartItemDtos(undefined);
            getAllCartItems();
        }
    }, [open]);

    return (
        <div>
            <Popper keepMounted open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper sx={{ width: 350, boxShadow: 3 , maxHeight: "300px", overflowY: "auto"}}>
                            {
                                renderCartPopperList()
                            }
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <IconButton
                id="fade-button"
                onClick={handleClick('bottom-end')}
                size="large"
                edge="end"
                color="inherit"
                sx={{color:'#000000'}}
            >
                <ShoppingCartIcon />
            </IconButton>
        </div>
    );
}