import React, {useState} from 'react'
import {IconButton,Drawer} from '@mui/material';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from '@mui/material/Divider';
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import MenuIcon from "@mui/icons-material/Menu";

export default function DrawerMenu() {
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, left: open });
            };

    const list = () => (
        <Box
            sx={{ width: 300, marginLeft: 2}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <div style={{ display: 'flex' }}>
                    <ListItem style={{ width: '20%' }} key="Logo" disablePadding>
                        <ListItemButton onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                            <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#001333",}} />

                        </ListItemButton>
                    </ListItem>

                    <Link to="/" style={{ width: '80%' }}>
                        <ListItem key="Logo" disablePadding>
                            <ListItemButton>
                                <img src="/logonew.png" width="125" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                </div>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
                    <ListItem key="ProductListing" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary="Product" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem key="Send email" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Send email" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Drafts" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="User" disablePadding>
                    <ListItemButton>
                        <ListItemIcon >
                            <FontAwesomeIcon icon={faUser} size="lg" style={{color: "#001333",}} />
                        </ListItemIcon>
                        <ListItemText primary="Shopping Cart" />
                    </ListItemButton>
                </ListItem>

                <ListItem key="Spam" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <React.Fragment>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 3 , color:'#555555'}}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </React.Fragment>
    )
}
