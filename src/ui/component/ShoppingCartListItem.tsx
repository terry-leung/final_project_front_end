import {CartItemDto} from "../../data/dto/CartItemDto.ts";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";

type Props = {
    data: CartItemDto;
    isLast: boolean;
}
export default function ShoppingCartListItem({data, isLast} : Props) {
    return (
        <>
            <ListItem style={{ display: 'flex', flexDirection: "column"}}>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "row"}}>
                    <Box sx={{ flexGrow: 1 , marginRight: 2}}>
                        <img src={data.image_url} height="50px"/>
                    </Box>
                    <Box sx={{ flexGrow: 2 }}>{data.name}</Box>
                </Box>
                <Typography variant="h6" sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{maxWidth: 150}}>
                        ${data.price.toLocaleString()}
                    </Box>
                    <Box sx={{marginLeft: 15, maxWidth: 150}}>
                        x{data.cart_quantity}
                    </Box>
                </Typography>
            </ListItem>
            {!isLast && <Divider sx={{ width: "100%" }} />}
        </>
    )
}