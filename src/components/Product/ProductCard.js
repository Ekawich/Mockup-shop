import React from 'react';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const ProductCard = (props) => {
    const discount = ((props.price * props.discountPercentage) / 100).toFixed(2)

    const setItemToCart = () => {
        let item = {
            id: props.id,
            brand: props.brand,
            thumbnail: props.thumbnail,
            title: props.title,
            discount: discount,
            desc: props.desc,
            price: props.price,
            quantity: 1
        }
        props.onClick(item)
    }

    return (
        <Card>
            <CardMedia
                sx={{ height: 200 }}
                image={props.thumbnail}
                title={props.title}
            />
            <CardContent sx={{ pb: 0 }}>
                <Typography gutterBottom variant='h5' component="div" className='product-title' sx={{ mb: 0, fontWeight: "bold" }}>
                    {props.title}
                </Typography>
                {/* <Typography color="text.secondary" className='product-desc' sx={{ mb: 1, fontSize: "small" }}>
                    {props.desc}
                </Typography> */}
                <Stack direction="row" alignItems="center">
                    <Typography variant="h6" sx={{ mr: 1, fontWeight: "bold" }} color="primary">
                        {(props.price - discount).toFixed(2) + "$"}
                    </Typography>
                    <Typography sx={{ textDecoration: "line-through", fontSize: "small" }}>
                        {props.price + "$"}
                    </Typography>
                </Stack>
                <Typography variant="h6" sx={{ fontSize: "small", mb: 1 }}>
                    {discount && 'Discount ' + discount + "$"}
                </Typography>
                <Rating name="read-only" value={props.rate} readOnly />
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" fullWidth onClick={setItemToCart}>Add to Cart</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;