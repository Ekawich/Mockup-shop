import React from 'react';
import CartItem from './CartItem';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";


import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

const Cart = () => {
    const showCart = useSelector(state => state.cart.toggleCart)
    const itemInCart = useSelector(state => state.cart.items)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const dispatch = useDispatch()

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
                open={showCart}
                onClose={handleClose}
            >
                <Box sx={{ width: 400, p: 2, }}>
                    <Box sx={{ height: "85vh", overflowY: "auto", mb: 2 }}>
                        <Grid container columns={12} spacing={2} sx={{ height: itemInCart.length === 0 ? "100%" : "auto" }}>
                            {itemInCart.length > 0 ? itemInCart.map((item, idx) => {
                                return (
                                    <Grid item md={12}>
                                        <CartItem
                                            key={item.id + idx}
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
                        {"Total amount " + parseFloat(totalPrice).toFixed(2)}
                    </Typography>
                    <Stack direction="row" justifyContent="end">
                        <Button variant="outlined" size='large' onClick={handleClose}>Close</Button>
                        {itemInCart.length > 0 && <Button variant="outlined" size='large' sx={{ ml: 2 }}>Check Out</Button>}
                    </Stack>
                </Box>
            </Drawer>
        </Box >
    );
};

export default Cart;