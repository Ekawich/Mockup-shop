import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

const CartItem = (props) => {
    const dispatch = useDispatch()

    const removeCart = () => {
        dispatch(cartActions.removeItem(props.id))
    }

    const increaseQuantityHandler = (itemId, newQuantity) => {
        console.log(itemId, newQuantity)
        dispatch(cartActions.updateQuantity({ itemId, newQuantity }))
    }

    const decreaseQuantityHandler = (itemId, newQuantity) => {
        dispatch(cartActions.updateQuantity({ itemId, newQuantity }))
    }

    return (
        <Card sx={{ display: 'flex', height: 120 }}>
            <CardMedia
                component="img"
                sx={{ width: "auto", maxWidth: "30%", height: "100%" }}
                image={props.thumbnail}
                alt={props.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", position: "relative" }} >
                <CardContent sx={{ flex: '1 0 auto', p: 1, px: 2 }}>
                    <Typography component="div" sx={{ fontWeight: "bold", fontSize: "medium" }}>
                        {props.title}
                    </Typography>
                    <Typography component="div" sx={{ fontSize: "small", opacity: "0.6" }}>
                        {props.brand}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" className='product-desc' sx={{ mb: 1 }}>
                        {props.desc}
                    </Typography> */}
                    <Typography sx={{ fontSize: "medium" }}>
                        {((props.price - props.discount).toFixed(2)) + "$"}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Typography component="div" sx={{ fontSize: "medium", fontWeight: "bold" }} color="primary">
                            {(parseFloat(props.price - props.discount).toFixed(2) * props.quantity)}$
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <IconButton aria-label="minus" color="primary" sx={{ p: 0 }} onClick={() => decreaseQuantityHandler(props.id, props.quantity - 1)}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            {/* <TextField label="Quantity" variant="outlined" size="small" defaultValue={props.quantity} sx={{ width: 70, mx: 1 }} /> */}
                            <Typography sx={{ fontSize: "medium", mx: 1 }}>
                                {props.quantity}
                            </Typography>
                            <IconButton aria-label="plus" color="primary" sx={{ p: 0 }} onClick={() => increaseQuantityHandler(props.id, props.quantity + 1)}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </CardContent>
                <IconButton aria-label="delete" sx={{ top: 0, right: 0, position: "absolute" }} onClick={removeCart}>
                    <ClearIcon fontSize="small" />
                </IconButton>
            </Box>
        </Card>
    );
};

export default CartItem;