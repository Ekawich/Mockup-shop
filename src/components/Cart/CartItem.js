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

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Delete from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

const CartItem = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const removeCart = () => {
        dispatch(cartActions.removeItem(props.id))
    }

    return (
        <Card sx={{ display: 'flex', my: 2 }} fullWidth>
            <CardMedia
                component="img"
                sx={{ width: 250 }}
                image={props.thumbnail}
                alt={props.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography component="div" variant="h6" sx={{ mb: 1 }}>
                        {props.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='product-desc' sx={{ mb: 2 }}>
                        {props.desc}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box sx={{ mr: 2 }}>
                            <Stack direction="row">
                                <Typography variant="h5" sx={{ mr: 1 }}>
                                    {(props.price - props.discount).toFixed(2) + "$"}
                                </Typography>
                                <Typography variant="h6" sx={{ textDecoration: "line-through" }}>
                                    {props.price + "$"}
                                </Typography>
                            </Stack>
                            <Typography variant="h6" sx={{ fontSize: "small" }}>
                                {props.discount && 'Discount ' + props.discount + "$"}
                            </Typography>
                        </Box>
                        <Box>
                            <Stack direction='row'>
                                <IconButton aria-label="ExpandLessIcon" size="large">
                                    <ExpandLessIcon color="action" />
                                </IconButton>
                                <TextField
                                    id="outlined-required"
                                    label="Quantity"
                                    defaultValue={props.quantity}
                                    size="small"
                                    sx={{ width: 100, mx: 1 }}
                                />
                                <IconButton aria-label="ExpandMoreIcon" size="large">
                                    <ExpandMoreIcon color="action" />
                                </IconButton>
                            </Stack>
                        </Box>
                        <Box>
                            <IconButton aria-label="delete" size="large" onClick={removeCart}>
                                <Delete color="action" />
                            </IconButton>
                        </Box>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CartItem;