// import {CssBaseline, Toolbar, Typography} from "@mui/material";
// import React from "react";

import {Link} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    IconButton,
    // Typography,
    Toolbar,
    InputBase,
    // Drawer,
    // Tabs,
    // Tab,
    useTheme,
    useMediaQuery,
    Button, Grid
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {useContext} from 'react';
import MenuTabs from "../MenuTabs.tsx";
import DrawerMenu from "../DrawerMenu.tsx";
import {LoginUserContext} from "../../../App.tsx";
import ShoppingCartList from "../ShoppingCartList.tsx";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 32,
    backgroundColor: alpha('#555555', 0.05),
    border: '1px solid #ffffff',
    '&:hover': {
        backgroundColor: alpha('#555555', 0.15),
    },
    '&:focus-within': {
        border: '2px solid #1976d2',
        backgroundColor: '#ffffff',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        color: '#000000',
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

// type Anchor = 'left';


export default function NavBar() {
    const loginUser = useContext(LoginUserContext);

    const renderLoginContainer = () => {
        if(loginUser) {
            return (
                <>
                <Box sx={{ color: 'black', padding: '10px', display: 'flex', alignItems: 'center' }}>
                    {loginUser.email}
                </Box>
                        {
                            isMatchMd ? (
                                <>
                                <Button
                                    variant = "contained"
                                    size="small"
                                    color="secondary"
                                    onClick={FirebaseAuthService.handleSignOut}
                                >
                                    Logout
                                </Button>
                                <ShoppingCartList/>
                            </>
                            ) : (
                                <>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={FirebaseAuthService.handleSignOut}
                                    sx={{mr:1}}
                                >
                                    Logout
                                </Button>
                                    <ShoppingCartList/>
                                </>
                            )
                        }
                </>
            )
        } else if (loginUser === null) {
            return (
                <>
                    <Box sx={{ color: 'black', padding: '10px', display: 'flex', alignItems: 'center' }}>
                    PleaseLogin
                    </Box>
                <Link to="/login">
                {
                    isMatchMd ? (
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="secondary"
                        >
                            <AccountCircle/>
                        </IconButton>
                    ) : (
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="secondary"
                            sx={{mr:1}}
                        >
                            <AccountCircle/>
                        </IconButton>
                    )
                }
        </Link>
                </>
            )
        } else {
            return <>
            </>
        }
    }

    const theme = useTheme();
    console.log(theme);
    const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMatchMd = useMediaQuery(theme.breakpoints.down('md'));
    const isMatchLg = useMediaQuery(theme.breakpoints.down('lg'));
    const isMatchXl = useMediaQuery(theme.breakpoints.down('xl'));
    console.log(isMatchMd)


    return (
        <Grid
            container
            spacing={0}
        >
            <AppBar position="relative" sx={{backgroundColor: '#ffffff', borderBottom: '1px solid black', padding: '10px', margin: 0, minWidth: '330px'}}>
                <Toolbar>
                    {
                        isMatchMd ? (
                            <>
                                <DrawerMenu/>
                                {
                                    isMatchSm ? (
                                        <>
                                        </>
                                    ) : (
                                        <Link to="/">
                                            <img src="/public/logonew.png" width="125" />
                                        </Link>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <Box>
                                <Link to="/">
                                    <img src="/public/logonew.png" width="125" />
                                </Link>
                                </Box>
                                <Box sx={{marginLeft: 'auto'}}>
                                <MenuTabs/>
                                </Box>
                            </>
                        )
                    }

                    <Box sx={{maxWidth: 1000,
                        display:{marginLeft: 'auto', sm: 'flex'}
                    }}>
                    <Search>
                        <SearchIconWrapper sx={{color: 'black'}}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        {/*<StyledInputBase*/}
                        {/*    placeholder="Search…"*/}
                        {/*    inputProps={{ 'aria-label': 'search' }}*/}
                        {/*    // sx={{minWidth: 150}}*/}
                        {/*/>*/}
                        {
                            isMatchSm ? (
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{minWidth: 150}}
                                />
                            ) : isMatchMd ? (
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{minWidth: 230}}
                                />
                            ) : isMatchLg ? (
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{minWidth: 320}}
                                />
                            ) : isMatchXl ? (
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{minWidth: 610}}
                                />
                            ) : (
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{minWidth: 850}}
                                />
                            )
                        }
                    </Search>
                    </Box>
                    {/*<Box sx={{ flexGrow: 2 }} />*/}
                    <Box sx={{display:'flex',marginLeft: 'auto'}}>
                        {
                            renderLoginContainer()
                        }
                    </Box>
                </Toolbar>
            </AppBar>
</Grid>
    );
}
        // <nav>
        //     <ul>
        //         <li>
        //             <Link to="/">Product Listing Page</Link>
        //         </li>
        //         <li>
        //             <Link to="/product/1/99">Product Detail Page</Link>
        //         </li>
        //         <li>
        //             <Link to="/shoppingcart">Shopping Cart Page</Link>
        //         </li>
        //         <li>
        //             <Link to="/checkout/1">Checkout Page</Link>
        //         </li>
        //         <li>
        //             <Link to="/thankyou">Thank You Page</Link>
        //         </li>
        //     </ul>
        // </nav>
