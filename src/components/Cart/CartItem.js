import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

const CartItem = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const removeCart = () => {
        dispatch(cartActions.removeItem(props.id))
    }

    return (
        <Card sx={{ display: 'flex', my: 2 }}>
            <CardMedia
                component="img"
                sx={{ maxWidth: 250, height: 200 }}
                image={props.thumbnail}
                alt={props.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography component="div" variant="h6" sx={{ mb: 1 }}>
                        {props.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='product-desc' sx={{ mb: 1 }}>
                        {props.desc}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Typography variant="h5" sx={{ mr: 4 }}>
                            {((props.price - props.discount).toFixed(2) * props.quantity) + "$"}
                        </Typography>
                        <Stack direction="row">
                            <IconButton aria-label="minus" color="primary">
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                id="outlined-number"
                                label="Quantity"
                                type="number"
                                size='small'
                                defaultValue={props.quantity}
                                sx={{ width: 75, mx: 1 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <IconButton aria-label="plus" color="primary">
                                <AddIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={removeCart}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CartItem;