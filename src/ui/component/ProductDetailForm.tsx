import {Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import ProductDetailQuantitySelector from "./ProductDetailQuantitySelector.tsx";
// import Box from "@mui/material/Box";
// import NavBar from "./NavBar";
import Divider from "@mui/material/Divider";
// import mockData from "./response.json"
import {ProductDetailDto} from "../../data/dto/ProductDetailDto.ts";

type Props = {
    productDetailData: ProductDetailDto | undefined;
}

export default function ProductDetailForm({productDetailData} : Props) {
    const [quantity, setQuantity] = useState<number>(1);

    const productDetailFormStyle = () => (
        {padding: "25px 25px 70px 25px",
            width: 280,
            position: "relative",
            margin: "auto",
        });

    return (
        <>
            <Grid
                // container
                // spacing={0}
                // direction="column"
                // alignItems="center"
                // justifyContent="center"
                // minHeight="100vh"
            >
                <Grid container spacing={2} sx={{ height: '100%' }}>
                    <Grid item xs={3}>
                        <img src={productDetailData?.image_url} /><br/>
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" sx={{ height: '100%' }} />
                    </Grid>
                    <Grid item container direction="column" xs={4}>
                        <Grid item sx={{ flex: 1 }}>
                            <Typography><h1>{productDetailData?.name}</h1></Typography>
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                            <Typography><h2>Price</h2></Typography>
                            <Typography><h2>${productDetailData?.price.toLocaleString()}</h2></Typography>
                                {
                                    productDetailData?.stock > 0
                                    ? (<Typography><h4>Item remaining:</h4>
                                            <h4>{productDetailData?.stock}</h4></Typography>)
                                    : <Typography><br/><h4>Out of stock</h4></Typography>
                                }
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                            <Typography><h2>Description</h2></Typography>
                            <Typography><h5>{productDetailData?.description}</h5></Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" sx={{ height: '100%' }} />
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={5} sx={productDetailFormStyle()}>
                            <ProductDetailQuantitySelector stock={productDetailData.stock} quantity={quantity} setQuantity={setQuantity}/>
                        </Paper>
                    </Grid>
                </Grid>
                    {/*<Grid>*/}
                    {/*    <Avatar>A</Avatar>*/}
                    {/*    <Typography><h3>Sign in</h3></Typography>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={6}></Grid>*/}
                    {/*<TextField sx={{paddingBottom: 3}} label='Email' placeholder='Enter Email Address' onChange={handleEmailOnChange} fullWidth required/>*/}
                    {/*<TextField sx={{paddingBottom: 2}} label='Password' placeholder='Enter password' type='password' onChange={handlePasswordOnChange} fullWidth required/>*/}
                    {/*<FormControlLabel*/}
                    {/*    control={*/}
                    {/*        <Checkbox*/}
                    {/*            name="checkedB"*/}
                    {/*            color="primary"*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    {/*<Button sx={{marginTop: 2}} type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>*/}
                    {/*/!*<Typography>*!/*/}
                    {/*/!*    *!/*/}
                    {/*/!*</Typography>*!/*/}

            </Grid>
        </>
    )
}