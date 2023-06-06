import React, { Fragment } from 'react';
import CartItem from './CartItem';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const itemStyle = {
    maxHeight: 450,
    overflowY: 'scroll'
}

const Cart = () => {
    const showCart = useSelector(state => state.cart.toggleCart)
    const itemInCart = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(cartActions.toggleCart())
    }
    return (
        <Modal
            open={showCart}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={itemStyle}>
                    {itemInCart.map((item, idx) => {
                        return (
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
                        )
                    })}
                </Box>
                <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="right" sx={{ mb: 2 }}>
                    {"Total amount " + parseFloat(totalAmount).toFixed(2)}
                </Typography>
                <Box>
                    <Stack direction="row" justifyContent="end">
                        <Button variant="outlined" size='large' onClick={handleClose}>Close</Button>
                        {itemInCart.length > 0 && <Button variant="outlined" size='large' sx={{ ml: 2 }}>Order</Button>}
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default Cart;