import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';


import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [cartLoading, setCartLoading] = useState(false)

    useEffect(() => {
        if (!cartLoading) {
            const savedCart = JSON.parse(localStorage.getItem('cart'))
            if (savedCart) {
                dispatch(cartActions.loadCart(savedCart))
            }
            setCartLoading(true)
        } else {
            const cartItem = {
                items: cart.items,
                totalPrice: cart.totalPrice,
                toggleCart: false
            }
            localStorage.setItem('cart', JSON.stringify(cartItem))
        }
    }, [cart])

    const handleClose = () => {
        dispatch(cartActions.toggleCart())
    }

    return (
        <Box
            sx={{ width: "auto" }}
            role="presentation"
        >
            <Drawer
                anchor={"right"}
                open={cart.toggleCart}
                onClose={handleClose}
            >
                <Box sx={{ width: 400, p: 2, height: "100%", position: "relative" }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="center" sx={{ fontWeight: "bold", mb: 2 }}>
                        My Cart
                    </Typography>
                    <Box sx={{ height: "80vh", overflowY: "auto", mb: 2 }}>
                        <Grid container columns={12} spacing={2} sx={{ height: cart.items.length === 0 ? "100%" : "auto" }}>
                            {cart.items.length > 0 ? cart.items.map((item, idx) => {
                                return (
                                    <Grid item md={12} key={item.id}>
                                        <CartItem
                                            id={item.id}
                                            thumbnail={item.thumbnail}
                                            brand={item.brand}
                                            title={item.title}
                                            discount={item.discount}
                                            price={item.price}
                                            quantity={item.quantity}
                                            desc={item.desc}
                                        />
                                    </Grid>
                                )
                            }) :
                                <Grid item md={12} sx={{ height: "100%" }}>
                                    <Stack direction='column' alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
                                        <Typography variant="h6" sx={{ opacity: "0.5" }}>
                                            Don't have item
                                        </Typography>
                                    </Stack>
                                </Grid>
                            }
                        </Grid>
                    </Box>
                    <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="right" sx={{ mb: 2 }}>
                        {"Total amount " + parseFloat(cart.totalPrice).toFixed(2)}
                    </Typography>
                    <Stack direction="row" justifyContent="end">
                        <Button variant="outlined" size='large' fullWidth disabled={cart.items.length > 0 ? false : true}>Check Out</Button>
                    </Stack>
                    <IconButton aria-label="delete" sx={{ top: 0, right: 0, position: "absolute" }} onClick={handleClose}>
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Drawer>
        </Box >
    );
};

export default Cart;