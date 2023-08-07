import {Button, Grid, Paper, Stack, Typography} from "@mui/material";
import {useContext, useState} from "react";
import ProductDetailQuantitySelector from "./ProductDetailQuantitySelector.tsx";
// import Box from "@mui/material/Box";
// import NavBar from "./NavBar";
import Divider from "@mui/material/Divider";
// import mockData from "./response.json"
import {ProductDetailDto} from "../../data/dto/ProductDetailDto.ts";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import * as CartItemApi from "../../api/CartItemApi.ts"
import {LoginUserContext} from "../../App.tsx";
// import {Link} from "react-router-dom";

type Props = {
    productDetailData: ProductDetailDto
}

export default function ProductDetailForm({productDetailData} : Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const loginUser = useContext(LoginUserContext);

    const handleAddToCart = async () => {
        try{
            await CartItemApi.putCartItem(productDetailData.pid, quantity);
            console.log("add item successfully")
        } catch (error) {
            console.log(error);
        }
    }

    const productDetailFormStyle = () => (
        {padding: "50px 25px 70px 25px",
            width: 280,
            position: "relative",
            marginTop: 8,
        });

    return (
        <>
            <Grid>
                <Grid container spacing={2} sx={{ maxWidth: 2000 , margin: 'auto'}}>
                    <Grid item xs={4}>
                        <img src={productDetailData?.image_url}
                             style={{ maxWidth: '100%', height: 'auto', marginTop: 20}}
                        alt=""
                        /><br/>
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
                                    productDetailData?.stock !== 0
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


                            <Stack sx={{alignItems: 'center', justifyContent: 'center'}} spacing={1} direction="column">
                                <Stack sx={{alignItems: 'center', justifyContent: 'center'}} spacing={1} direction="row">
                                    <ProductDetailQuantitySelector stock={productDetailData?.stock} quantity={quantity} setQuantity={setQuantity}/>
                                </Stack>
                                {
                                    productDetailData?.stock !== 0 ?
                                        (
                                            <>
                                                <Typography sx={{flex: 1, textAlign: 'center'}}><h3>In Stock!</h3></Typography>
                                                {
                                                    loginUser ? (
                                                        <Button onClick={handleAddToCart} variant="contained" size="large" color="error" endIcon={<AddShoppingCartIcon/>}>
                                                            Add To Cart
                                                        </Button>
                                                        ) : (
                                                        <Button disabled variant="contained" size="large" color="error" endIcon={<AddShoppingCartIcon/>}>
                                                            Please Login
                                                        </Button>
                                                    )
                                                }

                                            </>
                                        ) :
                                            (
                                                <>
                                                    <Typography sx={{flex: 1, textAlign: 'center'}}><h3>Out of Stock</h3></Typography>
                                                    <Button disabled variant="contained" size="large" color="error" endIcon={<AddShoppingCartIcon/>}>
                                                        Add To Cart
                                                    </Button>
                                                </>
                                            )
                                }
                            </Stack>


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