import React, { Fragment } from 'react';
import CartItem from './CartItem';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

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
    minHeight: 400,
    maxHeight: 650,
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
                {itemInCart.length > 0 ?
                    <Fragment>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Cart
                        </Typography>
                        <Box sx={itemStyle}>
                            {itemInCart.map((item, idx) => {
                                return (
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
                                )
                            })}
                        </Box>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            {"Totalamount " + parseFloat(totalAmount).toFixed(2) + "$"}
                        </Typography>
                    </Fragment> :
                    <Stack direction="row" alignItems='center' justifyContent='center' sx={{ height: 450 }}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Don't Have Item
                        </Typography>
                    </Stack>
                }
            </Box>
        </Modal>
    );
};

export default Cart;