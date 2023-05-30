import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavBars = () => {
    const dispatch = useDispatch()
    const countItems = useSelector(state => state.cart.items.length);

    const toggleCart = () => {
        dispatch(cartActions.toggleCart())
    }

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static" >
                <Container>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                mr: 2,
                                display: { sm: 'block', md: 'none' }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} href="/">
                            MOCKUP-SHOP
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <IconButton aria-label="ShoppingCart" size="large" onClick={toggleCart}>
                                <Badge badgeContent={countItems} color="secondary">
                                    <ShoppingCartIcon color="action" />
                                </Badge>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    );
};

export default NavBars;